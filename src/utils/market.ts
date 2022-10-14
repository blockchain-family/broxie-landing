export const getNftShiftedIndex = (
  index: number,
  totalNft: number,
  startIndex?: number | undefined | null
) => {
  if (!startIndex) {
    return null;
  }

  const shiftedIndex = index + startIndex;

  if (shiftedIndex >= totalNft) {
    return shiftedIndex - totalNft;
  }

  return shiftedIndex;
};
