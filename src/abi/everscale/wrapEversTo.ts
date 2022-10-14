export const wrapEversToAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [{ name: '_weverVault', type: 'address' }],
      outputs: [],
    },
    {
      name: 'buildLayer3',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'to', type: 'address' },
        { name: 'wrapPayload', type: 'cell' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'onReceiveTONsFromBridgeCallback',
      inputs: [
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'user', type: 'address' },
            { name: 'creditor', type: 'address' },
            { name: 'recipient', type: 'address' },
            { name: 'tokenAmount', type: 'uint128' },
            { name: 'tonAmount', type: 'uint128' },
            { name: 'swapType', type: 'uint8' },
            {
              components: [
                { name: 'numerator', type: 'uint128' },
                { name: 'denominator', type: 'uint128' },
              ],
              name: 'slippage',
              type: 'tuple',
            },
            { name: 'layer3', type: 'cell' },
          ],
          name: 'decodedEventData',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'weverVault',
      inputs: [],
      outputs: [{ name: 'weverVault', type: 'address' }],
    },
  ],
  data: [{ key: 1, name: 'nonce_', type: 'uint16' }],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'nonce_', type: 'uint16' },
    { name: 'weverVault', type: 'address' },
  ],
} as const;
