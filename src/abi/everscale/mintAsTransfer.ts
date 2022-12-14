export const mintAsTransferAbi = {
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
      name: 'buildPayload',
      inputs: [
        { name: 'dest', type: 'address' },
        { name: 'deployWalletVaule', type: 'uint128' },
        { name: 'transferPayload', type: 'cell' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'onAcceptTokensMint',
      inputs: [
        { name: 'value0', type: 'address' },
        { name: 'amount', type: 'uint128' },
        { name: 'user', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
  ],
  data: [{ key: 1, name: 'nonce_', type: 'uint32' }],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'nonce_', type: 'uint32' },
  ],
} as const;
