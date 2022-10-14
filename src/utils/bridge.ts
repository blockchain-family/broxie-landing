import BigNumber from 'bignumber.js';
import { Erc20Abi__factory, VaultAbi__factory } from 'abi/evm/generated';
import { Network, NetworkCurrency } from 'stores/StaticDataStore';
import { dexRootAbi } from 'abi/everscale/dexRoot';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { dexPairAbi } from 'abi/everscale/dexPair';
import { ethers } from 'ethers';
import { bridgeAssets } from 'config/assets';
import { creditFactoryAbi } from 'abi/everscale/creditFactory';
import { Buffer as BufferLib } from 'buffer';

export type BridgePaymentData = {
  network: Network;
  currency: NetworkCurrency;

  tip3amount: BigNumber;
  tip3token: {
    symbol: string;
    address: string;
    decimals: number;
  };

  erc20amount: BigNumber;
  erc20token: {
    symbol: string;
    address: string;
    decimals: number;
  };
  erc20balance: BigNumber;

  userAddress: string;
  vaultAddress: string;

  bridgeFeeAmount: BigNumber;
  additionalEverAmount: BigNumber;

  slippage10percentAmount: BigNumber;
  tip3totalAmount: BigNumber;
};

type GetBridgePaymentDataProps = {
  network: Network;
  currency: NetworkCurrency;
  tip3amount: BigNumber;
  tip3token: {
    symbol: string;
    address: string;
    decimals: number;
  };
  everBalance: BigNumber;
  userAddress: string;

  metaMask: ethers.providers.Web3Provider;
  everWallet: ProviderRpcClient;
};

export const getBridgePaymentData = async ({
  network,
  currency,
  tip3amount,
  tip3token,
  everBalance,
  userAddress,
  metaMask,
  everWallet,
}: GetBridgePaymentDataProps) => {
  const { vault: vaultAddress } = currency.vault;

  const vaultContract = VaultAbi__factory.connect(vaultAddress, metaMask);

  const erc20tokenAddress = await vaultContract.token();

  const erc20tokenContract = Erc20Abi__factory.connect(
    erc20tokenAddress,
    metaMask
  );

  const erc20tokenSymbol = await erc20tokenContract.symbol();
  const erc20tokenDecimals = await erc20tokenContract.decimals();
  const erc20tokenBalance = await erc20tokenContract.balanceOf(userAddress);

  const creditorFactoryAddress = new Address(bridgeAssets.creditorAddress);
  const creditorFactoryContract = new everWallet.Contract(
    creditFactoryAbi,
    creditorFactoryAddress
  );

  const { value0: creditorFee } = await creditorFactoryContract.methods
    .getDetails({ answerId: 0 })
    .call();

  const dexRootContract = new everWallet.Contract(
    dexRootAbi,
    new Address(bridgeAssets.dexRootAddress)
  );

  const { value0: dexPairAddress } = await dexRootContract.methods
    .getExpectedPairAddress({
      answerId: 0,
      left_root: new Address(tip3token.address),
      right_root: new Address(currency.tip3Token.address),
    })
    .call();

  const dexPairContract = new everWallet.Contract(dexPairAbi, dexPairAddress);

  const creditorFeeAmount = new BigNumber(bridgeAssets.creditorBody)
    .shiftedBy(-tip3token.decimals)
    .plus(new BigNumber(creditorFee.fee).shiftedBy(-tip3token.decimals));

  const additionalEverAmount = new BigNumber(6).plus(
    new BigNumber(everBalance.isLessThan(10) ? 10 : 0)
  );

  const totalTip3Amount = tip3amount
    .plus(creditorFeeAmount)
    .plus(additionalEverAmount);

  const totalTip3AmountWithSlippage = totalTip3Amount.div(0.9);

  const { expected_amount: tip3DexAmountToPay } = await dexPairContract.methods
    .expectedSpendAmount({
      answerId: 0,
      receive_amount: totalTip3AmountWithSlippage
        .shiftedBy(tip3token.decimals)
        .dp(0, BigNumber.ROUND_UP)
        .toFixed(),
      receive_token_root: new Address(tip3token.address),
    })
    .call();

  const erc20paymentData: BridgePaymentData = {
    network: network,
    currency: currency,
    tip3amount: tip3amount,
    tip3token: tip3token,
    erc20amount: new BigNumber(tip3DexAmountToPay).shiftedBy(
      -currency.tip3Token.decimals
    ),
    erc20token: {
      symbol: erc20tokenSymbol,
      address: erc20tokenAddress,
      decimals: erc20tokenDecimals,
    },
    erc20balance: new BigNumber(erc20tokenBalance.toString()).shiftedBy(
      -erc20tokenDecimals
    ),
    userAddress: userAddress,
    vaultAddress: vaultAddress,
    bridgeFeeAmount: creditorFeeAmount,
    additionalEverAmount: additionalEverAmount,
    slippage10percentAmount: totalTip3AmountWithSlippage.minus(totalTip3Amount),
    tip3totalAmount: totalTip3AmountWithSlippage,
  };

  return erc20paymentData;
};

type GetErc20AllowanceApprovalProps = {
  network: Network;
  ownerAddress: string;
  spenderAddres: string;
  erc20amount: BigNumber;
  erc20token: {
    address: string;
    decimals: number;
  };
  metaMask: ethers.providers.Web3Provider;
};

export const getErc20AllowanceApproval = async ({
  network,
  ownerAddress,
  spenderAddres,
  erc20amount,
  erc20token,
  metaMask,
}: GetErc20AllowanceApprovalProps) => {
  const signer = metaMask.getSigner();

  const erc20tokenContract = Erc20Abi__factory.connect(
    erc20token.address,
    signer
  );

  const allowance = await erc20tokenContract.allowance(
    ownerAddress,
    spenderAddres
  );

  const currentAllowance = new BigNumber(allowance.toString()).shiftedBy(
    -erc20token.decimals
  );

  if (currentAllowance.isGreaterThanOrEqualTo(erc20amount)) {
    return;
  }

  // For Ethereum we need to set allowance to 0 before setting new allowance
  // Ethereum 'approve' function source code: https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code#L205
  if (currentAllowance.isGreaterThan(0) && network.name === 'ethereum') {
    const zeroAllowanceTx = await approveAllowance({
      network,
      ownerAddress,
      spenderAddres,
      metaMask,
      erc20token,
      erc20amount: new BigNumber(0),
    });

    await zeroAllowanceTx.wait();
  }

  const allowanceToApprove = new BigNumber(1_000_000);

  const allowanceTx = await approveAllowance({
    network,
    ownerAddress,
    spenderAddres,
    metaMask,
    erc20token,
    erc20amount: allowanceToApprove,
  });

  await allowanceTx.wait();
};

type SendToDepositFactoryProps = {
  bridgePaymentData: BridgePaymentData;
  level3Payload: string;
  userAddress: Address;
  userAddressEvm: string;
  wrapEversToAddress: Address;
  metaMask: ethers.providers.Web3Provider;
};

export const sendDepositToFactory = async ({
  bridgePaymentData,
  level3Payload,
  userAddress,
  userAddressEvm,
  wrapEversToAddress,
  metaMask,
}: SendToDepositFactoryProps) => {
  const signer = metaMask.getSigner();

  const vaultContract = VaultAbi__factory.connect(
    bridgePaymentData.vaultAddress,
    signer
  );

  const deposit = {
    amount: bridgePaymentData.erc20amount
      .shiftedBy(bridgePaymentData.erc20token.decimals)
      .dp(0, BigNumber.ROUND_UP)
      .toFixed(),
    workchainId: 0,
    userAddress: `0x${userAddress.toString().split(':')[1]}`,
    creditorAddress: `0x${bridgeAssets.creditorAddress.split(':')[1]}`,
    recipientAddress: `0x${wrapEversToAddress.toString().split(':')[1]}`,
    tokenAmount: 0,
    everAmount: bridgePaymentData.additionalEverAmount
      .shiftedBy(bridgePaymentData.tip3token.decimals)
      .dp(0, BigNumber.ROUND_UP)
      .toFixed(),
    swapType: 1,
    slippageNumerator: 10,
    slippageDenominator: 1000,
    level3: `0x${BufferLib.from(level3Payload, 'base64').toString('hex')}`,
  };

  const feeData = await getFeeData(bridgePaymentData.network, metaMask);

  const estimatedGas = await vaultContract.estimateGas.depositToFactory(
    deposit.amount,
    deposit.workchainId,
    deposit.userAddress,
    deposit.creditorAddress,
    deposit.recipientAddress,
    deposit.tokenAmount,
    deposit.everAmount,
    deposit.swapType,
    deposit.slippageNumerator,
    deposit.slippageDenominator,
    deposit.level3,
    {
      from: userAddressEvm,
    }
  );

  const gasLimit = feeData?.gasLimitRequired
    ? new BigNumber(estimatedGas.toString())
        .multipliedBy(1.25)
        .dp(0, BigNumber.ROUND_UP)
        .toFixed()
    : undefined;

  await vaultContract.depositToFactory(
    deposit.amount,
    deposit.workchainId,
    deposit.userAddress,
    deposit.creditorAddress,
    deposit.recipientAddress,
    deposit.tokenAmount,
    deposit.everAmount,
    deposit.swapType,
    deposit.slippageNumerator,
    deposit.slippageDenominator,
    deposit.level3,
    {
      from: userAddressEvm,
      type: bridgePaymentData.network.transactionType,
      maxFeePerGas: feeData?.maxFeePerGas,
      maxPriorityFeePerGas: feeData?.maxPriorityFeePerGas,
      gasLimit: gasLimit,
    }
  );
};

const approveAllowance = async ({
  network,
  ownerAddress,
  spenderAddres,
  erc20amount,
  erc20token,
  metaMask,
}: GetErc20AllowanceApprovalProps) => {
  const signer = metaMask.getSigner();

  const erc20tokenContract = Erc20Abi__factory.connect(
    erc20token.address,
    signer
  );

  const feeData = await getFeeData(network, metaMask);

  const allowanceToApprove = new BigNumber(erc20amount)
    .shiftedBy(erc20token.decimals)
    .dp(0, BigNumber.ROUND_UP)
    .toFixed();

  const estimatedGas = await erc20tokenContract.estimateGas.approve(
    spenderAddres,
    allowanceToApprove,
    {
      from: ownerAddress,
    }
  );

  const gasLimit = feeData?.gasLimitRequired ? estimatedGas : undefined;

  const transaction = await erc20tokenContract.approve(
    spenderAddres,
    allowanceToApprove,
    {
      from: ownerAddress,
      type: network.transactionType,
      maxFeePerGas: feeData?.maxFeePerGas,
      maxPriorityFeePerGas: feeData?.maxPriorityFeePerGas,
      gasLimit: gasLimit,
    }
  );

  return transaction;
};

const getFeeData = async (
  network: Network,
  metaMask: ethers.providers.Web3Provider
) => {
  // if (network.name === 'polygon') {
  //   const response = await fetch('https://gasstation-mainnet.matic.network');
  //   const { fast }: { fast: number } = await response.json();

  //   return {
  //     gasPrice: new BigNumber(fast)
  //       .shiftedBy(9)
  //       .dp(0, BigNumber.ROUND_UP)
  //       .toFixed(),
  //     maxFeePerGas: undefined,
  //     maxPriorityFeePerGas: undefined,
  //   };
  // }

  if (network.transactionType === 0x2) {
    const { maxFeePerGas, maxPriorityFeePerGas } = await metaMask.getFeeData();

    return {
      maxFeePerGas: maxFeePerGas ?? undefined,
      maxPriorityFeePerGas: maxPriorityFeePerGas ?? undefined,
      gasLimitRequired: true,
    };
  }

  return undefined;
};
