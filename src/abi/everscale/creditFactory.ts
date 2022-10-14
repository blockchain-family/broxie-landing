export const creditFactoryAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [
        { name: 'admin_', type: 'address' },
        { name: 'owners_', type: 'uint256[]' },
        { name: 'fee', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'setCreditProcessorCode',
      inputs: [{ name: 'value', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'getCreditProcessorCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'setFee',
      inputs: [{ name: 'value', type: 'uint128' }],
      outputs: [],
    },
    {
      name: 'getDetails',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        {
          components: [
            { name: 'owners', type: 'uint256[]' },
            { name: 'fee', type: 'uint128' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'deployProcessorForUser',
      inputs: [
        {
          components: [
            { name: 'eventTransaction', type: 'uint256' },
            { name: 'eventIndex', type: 'uint32' },
            { name: 'eventData', type: 'cell' },
            { name: 'eventBlockNumber', type: 'uint32' },
            { name: 'eventBlock', type: 'uint256' },
          ],
          name: 'eventVoteData',
          type: 'tuple',
        },
        { name: 'configuration', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'deployProcessor',
      inputs: [
        {
          components: [
            { name: 'eventTransaction', type: 'uint256' },
            { name: 'eventIndex', type: 'uint32' },
            { name: 'eventData', type: 'cell' },
            { name: 'eventBlockNumber', type: 'uint32' },
            { name: 'eventBlock', type: 'uint256' },
          ],
          name: 'eventVoteData',
          type: 'tuple',
        },
        { name: 'configuration', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'getCreditProcessorAddress',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        {
          components: [
            { name: 'eventTransaction', type: 'uint256' },
            { name: 'eventIndex', type: 'uint32' },
            { name: 'eventData', type: 'cell' },
            { name: 'eventBlockNumber', type: 'uint32' },
            { name: 'eventBlock', type: 'uint256' },
          ],
          name: 'eventVoteData',
          type: 'tuple',
        },
        { name: 'configuration', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'proxyTokensTransfer',
      inputs: [
        { name: '_tokenWallet', type: 'address' },
        { name: '_gasValue', type: 'uint128' },
        { name: '_amount', type: 'uint128' },
        { name: '_recipient', type: 'address' },
        { name: '_deployWalletValue', type: 'uint128' },
        { name: '_remainingGasTo', type: 'address' },
        { name: '_notify', type: 'bool' },
        { name: '_payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'sendGas',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'value_', type: 'uint128' },
        { name: 'flag_', type: 'uint16' },
      ],
      outputs: [],
    },
    {
      name: 'runRevertRemainderGas',
      inputs: [{ name: 'creditProcessor', type: 'address' }],
      outputs: [],
    },
    {
      name: 'runProcess',
      inputs: [{ name: 'creditProcessor', type: 'address' }],
      outputs: [],
    },
    {
      name: 'runDeriveEventAddress',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runRequestEventConfigDetails',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runDeployEvent',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runRequestTokenEventProxyConfig',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runRequestDexPairAddress',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runRequestDexVault',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runCheckEventStatus',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runRetryUnwrap',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runRetrySwap',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'runSetSlippage',
      inputs: [
        { name: 'creditProcessor', type: 'address' },
        { name: 'grams', type: 'uint128' },
        {
          components: [
            { name: 'numerator', type: 'uint128' },
            { name: 'denominator', type: 'uint128' },
          ],
          name: 'slippage',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'upgrade',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'addOwner',
      inputs: [{ name: 'newOwner', type: 'uint256' }],
      outputs: [],
    },
    {
      name: 'resetOwners',
      inputs: [],
      outputs: [],
    },
    {
      name: '_randomNonce',
      inputs: [],
      outputs: [{ name: '_randomNonce', type: 'uint256' }],
    },
    {
      name: 'admin',
      inputs: [],
      outputs: [{ name: 'admin', type: 'address' }],
    },
    {
      name: 'owners',
      inputs: [],
      outputs: [{ name: 'owners', type: 'uint256[]' }],
    },
    {
      name: 'version',
      inputs: [],
      outputs: [{ name: 'version', type: 'uint32' }],
    },
  ],
  data: [{ key: 1, name: '_randomNonce', type: 'uint256' }],
  events: [
    {
      name: 'OwnerAdded',
      inputs: [{ name: 'newOwner', type: 'uint256' }],
      outputs: [],
    },
    {
      name: 'FeeChanged',
      inputs: [{ name: 'value', type: 'uint128' }],
      outputs: [],
    },
    {
      name: 'CreditProcessorCodeChanged',
      inputs: [{ name: 'hash', type: 'uint256' }],
      outputs: [],
    },
    {
      name: 'DeployProcessorForUserCalled',
      inputs: [
        {
          components: [
            { name: 'eventTransaction', type: 'uint256' },
            { name: 'eventIndex', type: 'uint32' },
            { name: 'eventData', type: 'cell' },
            { name: 'eventBlockNumber', type: 'uint32' },
            { name: 'eventBlock', type: 'uint256' },
          ],
          name: 'eventVoteData',
          type: 'tuple',
        },
        { name: 'configuration', type: 'address' },
        { name: 'sender', type: 'address' },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: '_randomNonce', type: 'uint256' },
    { name: 'admin', type: 'address' },
    { name: 'owners', type: 'uint256[]' },
    { name: 'version', type: 'uint32' },
    { name: 'fee_', type: 'uint128' },
    { name: 'creditProcessorCode', type: 'cell' },
  ],
} as const;
