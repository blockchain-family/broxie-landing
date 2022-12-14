export const dexRootAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [
        { name: 'initial_owner', type: 'address' },
        { name: 'initial_vault', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'installPlatformOnce',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'installOrUpdateAccountCode',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'installOrUpdatePairCode',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'getAccountVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'getPairVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'setVaultOnce',
      inputs: [{ name: 'new_vault', type: 'address' }],
      outputs: [],
    },
    {
      name: 'getVault',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'setActive',
      inputs: [{ name: 'new_active', type: 'bool' }],
      outputs: [],
    },
    {
      name: 'isActive',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'upgrade',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'requestUpgradeAccount',
      inputs: [
        { name: 'current_version', type: 'uint32' },
        { name: 'send_gas_to', type: 'address' },
        { name: 'account_owner', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'forceUpgradeAccount',
      inputs: [
        { name: 'account_owner', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'upgradePair',
      inputs: [
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'resetGas',
      inputs: [{ name: 'receiver', type: 'address' }],
      outputs: [],
    },
    {
      name: 'resetTargetGas',
      inputs: [
        { name: 'target', type: 'address' },
        { name: 'receiver', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getOwner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'dex_owner', type: 'address' }],
    },
    {
      name: 'getPendingOwner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'dex_pending_owner', type: 'address' }],
    },
    {
      name: 'transferOwner',
      inputs: [{ name: 'new_owner', type: 'address' }],
      outputs: [],
    },
    {
      name: 'acceptOwner',
      inputs: [],
      outputs: [],
    },
    {
      name: 'getExpectedAccountAddress',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'account_owner', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getExpectedPairAddress',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'deployAccount',
      inputs: [
        { name: 'account_owner', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'deployPair',
      inputs: [
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'onPairCreated',
      inputs: [
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'platform_code',
      inputs: [],
      outputs: [{ name: 'platform_code', type: 'cell' }],
    },
    {
      name: 'account_code',
      inputs: [],
      outputs: [{ name: 'account_code', type: 'cell' }],
    },
    {
      name: 'pair_code',
      inputs: [],
      outputs: [{ name: 'pair_code', type: 'cell' }],
    },
  ],
  data: [{ key: 1, name: '_nonce', type: 'uint32' }],
  events: [
    {
      name: 'AccountCodeUpgraded',
      inputs: [{ name: 'version', type: 'uint32' }],
      outputs: [],
    },
    {
      name: 'PairCodeUpgraded',
      inputs: [{ name: 'version', type: 'uint32' }],
      outputs: [],
    },
    {
      name: 'RootCodeUpgraded',
      inputs: [],
      outputs: [],
    },
    {
      name: 'ActiveUpdated',
      inputs: [{ name: 'new_active', type: 'bool' }],
      outputs: [],
    },
    {
      name: 'RequestedPairUpgrade',
      inputs: [
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'RequestedForceAccountUpgrade',
      inputs: [{ name: 'account_owner', type: 'address' }],
      outputs: [],
    },
    {
      name: 'RequestedOwnerTransfer',
      inputs: [
        { name: 'old_owner', type: 'address' },
        { name: 'new_owner', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'OwnerTransferAccepted',
      inputs: [
        { name: 'old_owner', type: 'address' },
        { name: 'new_owner', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'NewPairCreated',
      inputs: [
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'platform_code', type: 'cell' },
    { name: '_nonce', type: 'uint32' },
    { name: 'account_code', type: 'cell' },
    { name: 'account_version', type: 'uint32' },
    { name: 'pair_code', type: 'cell' },
    { name: 'pair_version', type: 'uint32' },
    { name: 'active', type: 'bool' },
    { name: 'owner', type: 'address' },
    { name: 'vault', type: 'address' },
    { name: 'pending_owner', type: 'address' },
  ],
} as const;
