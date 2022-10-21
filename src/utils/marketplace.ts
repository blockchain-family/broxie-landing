import { broxieCollection } from 'config/collection';
import { Address } from 'everscale-inpage-provider';

const marketPlaceApi = 'https://indexer-api.bf.works/nfts';
const collectionAddress =
  '0:4876694042b5b385318f2bd49f2eebf9d68913f1ccd723ab95c5ccb12979c8ba';

type NftsApiResponse = {
  items?: { address: string }[];
};

export const getOwnedNfts = async (ownerAddress: Address) => {
  try {
    const response = await fetch(marketPlaceApi, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        owners: [ownerAddress.toString()],
        collections: [collectionAddress],
        limit: broxieCollection.length,
        offset: 0,
      }),
    });

    const responseBody: NftsApiResponse = await response.json();

    return (
      responseBody.items
        ?.map(
          (x) =>
            broxieCollection.find((broxie) => broxie.address === x.address)
              ?.id ?? -1
        )
        .filter((x) => x >= 0) ?? []
    );
  } catch (err) {
    console.error(err);

    return [];
  }
};
