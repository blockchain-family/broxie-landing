import ExternalLink from 'components/core/external-link';
import { observer } from 'mobx-react-lite';
import { useStaticData } from 'providers/StaticDataProvider';
import { FormattedMessage } from 'react-intl';
import {
  ProvideProvenanceRecordStore,
  useProvenanceRecordStore,
} from './providers/ProvenanceRecordProvider';

const ProvenanceRecord = observer(() => {
  const staticData = useStaticData();
  const provenanceStore = useProvenanceRecordStore();

  return (
    <div className='max-w-screen-lg mx-auto flex flex-col space-y-10 pt-28 pb-10 sm:pt-52 text-center px-4'>
      <span className='mb-6 text-4xl sm:text-6xl font-header'>
        <FormattedMessage
          id='provenance.title'
          defaultMessage='Broxies Provenance Record'
        />
      </span>

      <span>
        <FormattedMessage
          id='provenance.title.description'
          defaultMessage='The ownership record displays the history of each Broxie that will ever exist. Each Broxie is first hashed via the SHA-256 algorithm. Then strings are combined into a single chain by joining together the SHA-256 of each Broxie in the order below. Once the combined string is then hashed, we get the final proof. This represents the complete ownership record and origin of each Broxie.'
        />
      </span>

      <div className='flex flex-col bg-secondaryBg rounded-3xl p-6 space-y-8'>
        <div className='flex flex-col space-y-3'>
          <span>
            <FormattedMessage
              id='provenance.id.starting_index'
              defaultMessage='Finalized Starting Index: {index}'
              values={{ index: provenanceStore.startIndex ?? 'TBD' }}
            />
          </span>
          <span className='flex flex-col'>
            <FormattedMessage
              id='provenance.id.description'
              defaultMessage='Each Broxie token ID is assigned to an artwork image from the original sequence with this formula:'
            />

            <span className='font-bold text-sm'>
              <FormattedMessage
                id='provenance.id.description.formula'
                defaultMessage='{formula} => Image Index From the Original Sequence Broxie'
                values={{
                  formula: `(idNft + startingIndex) % totalCount`,
                }}
              />
            </span>
          </span>
        </div>

        <div className='flex flex-col space-y-1'>
          <span className='overflow-hidden text-ellipsis'>
            <FormattedMessage
              id='provenance.id.market_address'
              defaultMessage='Broxies Contract address: {address}'
              values={{
                address: (
                  <ExternalLink
                    href={`${staticData.urls.everscan}/accounts/${provenanceStore.marketAddress}`}
                  >
                    {provenanceStore.marketAddress}
                  </ExternalLink>
                ),
              }}
            />
          </span>

          <span className='overflow-hidden text-ellipsis'>
            <FormattedMessage
              id='provenance.id.collection_address'
              defaultMessage='Collection Contract address: {address}'
              values={{
                address: (
                  <ExternalLink
                    href={`${staticData.urls.everscan}/accounts/${provenanceStore.collectionAddress}`}
                  >
                    {provenanceStore.collectionAddress}
                  </ExternalLink>
                ),
              }}
            />
          </span>

          <span className='overflow-hidden text-ellipsis'>
            <FormattedMessage
              id='provenance.id.final_proof_hash'
              defaultMessage='Final Proof Hash: {hash}'
              values={{
                hash: <span>{provenanceStore.provenanceHash}</span>,
              }}
            />
          </span>
        </div>
      </div>

      <div className='flex flex-col mt-10 sm:mt-20 space-y-3'>
        <span className='text-4xl font-header'>
          <FormattedMessage
            id='provenance.id.concatenated_hash'
            defaultMessage='Concatenated Hash String'
          />
        </span>

        <div className='max-h-24 w-full overflow-x-hidden overflow-y-auto p-1 break-all'>
          <span>{provenanceStore.concatenatedHash}</span>
        </div>
      </div>

      <div className='flex flex-col space-y-2'>
        <span>
          <FormattedMessage
            id='provenance.id.table'
            defaultMessage='The table below lists the original index, assigned Broxie Token ID, SHA256 Hash output and IPFS link of each Broxie image'
          />
        </span>

        <span className='font-bold text-sm'>
          <FormattedMessage
            id='provenance.id.table.columns'
            defaultMessage='Initial Sequence Index - Assigned Broxie Token ID - SHA-256 - IPFS Link'
          />
        </span>
      </div>

      <div className='flex flex-col space-y-3 text-sm'>
        {provenanceStore.collection.map((x) => (
          <div
            key={x.id}
            className='flex items-center justify-between flex-wrap overflow-hidden'
          >
            <div className='flex space-x-2 pr-2 border-r border-r-primary'>
              <span className='w-10 border-r pr-2 border-r-primary'>
                {x.id}
              </span>
              <span className='w-10'>{x.finalId ?? 'TBD'}</span>
            </div>
            <span>{x.hash}</span>
            <ExternalLink
              href={`${staticData.urls.ipfs}/${x.url}`}
              className='max-w-xs overflow-hidden text-ellipsis'
            >
              <span>{x.url}</span>
            </ExternalLink>
          </div>
        ))}
      </div>
    </div>
  );
});

const ProvenanceRecordPage = () => {
  return (
    <ProvideProvenanceRecordStore>
      <ProvenanceRecord />
    </ProvideProvenanceRecordStore>
  );
};

export default ProvenanceRecordPage;
