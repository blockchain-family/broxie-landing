const ProvenanceRecordPage = () => {
  return (
    <div className='max-w-screen-lg mx-auto flex flex-col gap-10 pt-28 pb-10 sm:pt-52 text-center px-4'>
      <div className='mb-6'>
        <span className='text-4xl sm:text-6xl font-header'>
          Hashmasks Provenance Record
        </span>
      </div>

      <span>
        This page presents the provenance record of each Hashmask that will ever
        exist. Each full resolution Hashmask image is firstly hashed using
        SHA-256 algorithm. A combined string is obtained by concatenating
        SHA-256 of each Hashmask image in the specific order as listed below.
        The final proof is obtained by SHA-256 hashing this combined string.
        This is the final provenance record stored on the smart contract
      </span>

      <div className='bg-secondaryBg rounded-3xl p-6 min-h-[20rem]'>
        <span>Some really important information here duh</span>
      </div>

      <span className='text-4xl font-header mt-10 sm:mt-20'>
        Concatenated Hash String
      </span>

      <span>
        The table below lists the original index, assigned Hashmask Token ID,
        SHA256 Hash output of each Hashmask image.
      </span>
    </div>
  );
};

export default ProvenanceRecordPage;
