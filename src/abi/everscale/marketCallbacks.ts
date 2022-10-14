export const marketCallbacksAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['time'],
  functions: [
    {
      name: 'onSuccess',
      inputs: [
        { name: 'id', type: 'uint32' },
        { name: 'from', type: 'uint16' },
        { name: 'to', type: 'uint16' },
      ],
      outputs: [],
    },
    {
      name: 'onCancel',
      inputs: [{ name: 'id', type: 'uint32' }],
      outputs: [],
    },
  ],
  data: [],
  events: [],
} as const;
