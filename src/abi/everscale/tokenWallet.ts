export const tokenWalletAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [],
      outputs: [],
    },
    {
      name: 'supportsInterface',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'interfaceID', type: 'uint32' },
      ],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'destroy',
      inputs: [{ name: 'remainingGasTo', type: 'address' }],
      outputs: [],
    },
    {
      name: 'burnByRoot',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'callbackTo', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'burn',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'callbackTo', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'balance',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint128' }],
    },
    {
      name: 'owner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'root',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'walletCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'transfer',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipient', type: 'address' },
        { name: 'deployWalletValue', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'transferToWallet',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipientTokenWallet', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'acceptTransfer',
      id: '0x67A0B95F',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'sender', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'acceptMint',
      id: '0x4384F298',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'sendSurplusGas',
      inputs: [{ name: 'to', type: 'address' }],
      outputs: [],
    },
  ],
  data: [
    { key: 1, name: 'root_', type: 'address' },
    { key: 2, name: 'owner_', type: 'address' },
  ],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'root_', type: 'address' },
    { name: 'owner_', type: 'address' },
    { name: 'balance_', type: 'uint128' },
  ],
} as const;
