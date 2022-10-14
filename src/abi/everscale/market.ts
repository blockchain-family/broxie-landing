export const marketAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [
        { name: '_totalCount', type: 'uint16' },
        { name: '_startDate', type: 'uint32' },
        { name: '_revealDate', type: 'uint32' },
        { name: '_owner', type: 'address' },
        { name: '_managers', type: 'address[]' },
        { name: '_nftPerHand', type: 'uint16' },
        { name: '_collection', type: 'address' },
        { name: '_provenanceHash', type: 'string' },
        { name: '_tokenRoot', type: 'address' },
        { name: '_discountPrice', type: 'uint128' },
        { name: '_priceRule', type: 'map(uint16,uint128)' },
        { name: '_airDrop', type: 'map(address,uint16)' },
        { name: '_whiteList', type: 'map(address,uint16)' },
      ],
      outputs: [],
    },
    {
      name: 'loadNftData',
      inputs: [
        {
          components: [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'previewUrl', type: 'string' },
            { name: 'ipfsUrl', type: 'string' },
            {
              components: [
                { name: 'trait_type', type: 'string' },
                { name: 'value', type: 'string' },
              ],
              name: 'attributes',
              type: 'tuple[]',
            },
            { name: 'externalUrl', type: 'string' },
          ],
          name: '_nftData',
          type: 'map(uint32,tuple)',
        },
      ],
      outputs: [],
    },
    {
      name: 'onTokenWallet',
      inputs: [{ name: '_tokenWallet', type: 'address' }],
      outputs: [],
    },
    {
      name: 'state',
      inputs: [],
      outputs: [{ name: 'value0', type: 'uint8' }],
    },
    {
      name: 'nftData',
      inputs: [],
      outputs: [
        {
          components: [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'previewUrl', type: 'string' },
            { name: 'ipfsUrl', type: 'string' },
            {
              components: [
                { name: 'trait_type', type: 'string' },
                { name: 'value', type: 'string' },
              ],
              name: 'attributes',
              type: 'tuple[]',
            },
            { name: 'externalUrl', type: 'string' },
          ],
          name: 'value0',
          type: 'map(uint32,tuple)',
        },
      ],
    },
    {
      name: 'nftsOf',
      inputs: [{ name: '_user', type: 'address' }],
      outputs: [{ name: 'value0', type: 'uint16[]' }],
    },
    {
      name: 'buildPayload',
      inputs: [
        { name: 'id', type: 'uint32' },
        { name: 'toNftNumber', type: 'uint16' },
        { name: 'user', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'onAcceptTokensTransfer',
      inputs: [
        { name: 'value0', type: 'address' },
        { name: 'amount', type: 'uint128' },
        { name: 'sender', type: 'address' },
        { name: 'value3', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'commonSoldCount',
      inputs: [],
      outputs: [{ name: 'value0', type: 'uint16' }],
    },
    {
      name: 'discountOf',
      inputs: [{ name: 'user', type: 'address' }],
      outputs: [{ name: 'value0', type: 'uint16' }],
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
          name: '_data',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'reveal',
      inputs: [],
      outputs: [],
    },
    {
      name: 'withdraw',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipient', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'claimNfts',
      inputs: [],
      outputs: [],
    },
    {
      name: 'claimNftsFor',
      inputs: [{ name: 'user', type: 'address' }],
      outputs: [],
    },
    {
      name: 'upgrade',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'addManager',
      inputs: [{ name: 'newManager', type: 'address' }],
      outputs: [],
    },
    {
      name: 'resetManagers',
      inputs: [],
      outputs: [],
    },
    {
      name: 'managers',
      inputs: [],
      outputs: [{ name: 'value0', type: 'address[]' }],
    },
    {
      name: 'owner',
      inputs: [],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'transferOwnership',
      inputs: [{ name: 'newOwner', type: 'address' }],
      outputs: [],
    },
    {
      name: 'nftPerHand',
      inputs: [],
      outputs: [{ name: 'nftPerHand', type: 'uint16' }],
    },
    {
      name: 'totalCount',
      inputs: [],
      outputs: [{ name: 'totalCount', type: 'uint16' }],
    },
    {
      name: 'soldCount',
      inputs: [],
      outputs: [{ name: 'soldCount', type: 'uint16' }],
    },
    {
      name: 'mintCount',
      inputs: [],
      outputs: [{ name: 'mintCount', type: 'uint16' }],
    },
    {
      name: 'collection',
      inputs: [],
      outputs: [{ name: 'collection', type: 'address' }],
    },
    {
      name: 'startDate',
      inputs: [],
      outputs: [{ name: 'startDate', type: 'uint32' }],
    },
    {
      name: 'revealDate',
      inputs: [],
      outputs: [{ name: 'revealDate', type: 'uint32' }],
    },
    {
      name: 'totalRaised',
      inputs: [],
      outputs: [{ name: 'totalRaised', type: 'uint128' }],
    },
    {
      name: 'totalWithdraw',
      inputs: [],
      outputs: [{ name: 'totalWithdraw', type: 'uint128' }],
    },
    {
      name: 'provenanceHash',
      inputs: [],
      outputs: [{ name: 'provenanceHash', type: 'string' }],
    },
    {
      name: 'startIndex',
      inputs: [],
      outputs: [{ name: 'startIndex', type: 'optional(uint32)' }],
    },
    {
      name: 'tokenRoot',
      inputs: [],
      outputs: [{ name: 'tokenRoot', type: 'address' }],
    },
    {
      name: 'tokenWallet',
      inputs: [],
      outputs: [{ name: 'tokenWallet', type: 'address' }],
    },
    {
      name: 'soldCountDiscount',
      inputs: [],
      outputs: [{ name: 'soldCountDiscount', type: 'uint16' }],
    },
    {
      name: 'soldCountAirdrop',
      inputs: [],
      outputs: [{ name: 'soldCountAirdrop', type: 'uint16' }],
    },
    {
      name: 'discountPrice',
      inputs: [],
      outputs: [{ name: 'discountPrice', type: 'uint128' }],
    },
    {
      name: 'priceRule',
      inputs: [],
      outputs: [{ name: 'priceRule', type: 'map(uint16,uint128)' }],
    },
    {
      name: 'soldNfts',
      inputs: [],
      outputs: [{ name: 'soldNfts', type: 'map(address,uint16[])' }],
    },
    {
      name: 'claimNft',
      inputs: [],
      outputs: [{ name: 'claimNft', type: 'map(address,bool)' }],
    },
    {
      name: 'airDrop',
      inputs: [],
      outputs: [{ name: 'airDrop', type: 'map(address,uint16)' }],
    },
    {
      name: 'whiteList',
      inputs: [],
      outputs: [{ name: 'whiteList', type: 'map(address,uint16)' }],
    },
  ],
  data: [{ key: 1, name: 'nonce_', type: 'uint64' }],
  events: [
    {
      name: 'ManagerAdded',
      inputs: [{ name: 'newManager', type: 'address' }],
      outputs: [],
    },
    {
      name: 'ManagersReset',
      inputs: [],
      outputs: [],
    },
    {
      name: 'OwnershipTransferred',
      inputs: [
        { name: 'oldOwner', type: 'address' },
        { name: 'newOwner', type: 'address' },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'owner_', type: 'address' },
    { name: 'managers_', type: 'address[]' },
    { name: 'nonce_', type: 'uint64' },
    { name: 'nftPerHand', type: 'uint16' },
    { name: 'totalCount', type: 'uint16' },
    { name: 'soldCount', type: 'uint16' },
    { name: 'mintCount', type: 'uint16' },
    { name: 'collection', type: 'address' },
    { name: 'startDate', type: 'uint32' },
    { name: 'revealDate', type: 'uint32' },
    { name: 'totalRaised', type: 'uint128' },
    { name: 'totalWithdraw', type: 'uint128' },
    { name: 'provenanceHash', type: 'string' },
    { name: 'startIndex', type: 'optional(uint32)' },
    { name: 'tokenRoot', type: 'address' },
    { name: 'tokenWallet', type: 'address' },
    { name: 'soldCountDiscount', type: 'uint16' },
    { name: 'soldCountAirdrop', type: 'uint16' },
    { name: 'discountPrice', type: 'uint128' },
    {
      components: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'previewUrl', type: 'string' },
        { name: 'ipfsUrl', type: 'string' },
        {
          components: [
            { name: 'trait_type', type: 'string' },
            { name: 'value', type: 'string' },
          ],
          name: 'attributes',
          type: 'tuple[]',
        },
        { name: 'externalUrl', type: 'string' },
      ],
      name: 'nftData_',
      type: 'map(uint32,tuple)',
    },
    { name: 'priceRule', type: 'map(uint16,uint128)' },
    { name: 'soldNfts', type: 'map(address,uint16[])' },
    { name: 'claimNft', type: 'map(address,bool)' },
    { name: 'airDrop', type: 'map(address,uint16)' },
    { name: 'whiteList', type: 'map(address,uint16)' },
  ],
} as const;
