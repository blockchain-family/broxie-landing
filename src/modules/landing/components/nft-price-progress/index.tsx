import { observer } from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { useMemo } from 'react';
import { bigNumberToStr } from 'utils/strings';

const NftPriceProgress = observer(() => {
  const intl = useIntl();
  const broxieStore = useBroxieStore();

  const priceProgressStages = useMemo(() => {
    const priceRules = broxieStore.marketInfo.priceRules;
    const totalNft = broxieStore.marketInfo.nftTotal;
    const totalNftSold = broxieStore.totalNftSoldRegularPrice;
    const totalNftSoldDiscount =
      broxieStore.totalNftSold - broxieStore.totalNftSoldRegularPrice;

    const discountPrice = broxieStore.marketInfo.discountPrice;

    return priceRules.map((x, index) => {
      const nextIndex = index + 1;
      const fromNft = x.count;
      const toNft =
        nextIndex < priceRules.length ? priceRules[nextIndex].count : totalNft;
      const stepNftCount = toNft - fromNft;
      const price = x.price;

      const isWhitelist = discountPrice.isEqualTo(price);
      const isAirdrop = price.isEqualTo(0);

      let progress = Math.max(
        Math.min(((totalNftSold - fromNft) / stepNftCount) * 100, 100),
        0
      );

      const weight = (stepNftCount / totalNft) * 90;

      if (isWhitelist) {
        progress += Math.max(
          Math.min(
            ((toNft + totalNftSoldDiscount - totalNft) / stepNftCount) * 100,
            100
          ),
          0
        );
      }

      return {
        stepNftCount: stepNftCount,
        price: price,
        progress: progress,
        isWhitelist: isWhitelist,
        isAirdrop: isAirdrop,
        weight: weight,
      };
    });
  }, [
    broxieStore.marketInfo.discountPrice,
    broxieStore.marketInfo.nftTotal,
    broxieStore.marketInfo.priceRules,
    broxieStore.totalNftSold,
    broxieStore.totalNftSoldRegularPrice,
  ]);

  const regularPriceStages = useMemo(
    () => priceProgressStages.filter((x) => !x.isAirdrop && !x.isWhitelist),
    [priceProgressStages]
  );

  const airdropStage = useMemo(
    () => priceProgressStages.find((x) => x.isAirdrop),
    [priceProgressStages]
  );

  const whitelistStage = useMemo(
    () => priceProgressStages.find((x) => x.isWhitelist),
    [priceProgressStages]
  );

  return (
    <div className='flex flex-col w-full max-w-5xl'>
      <div className='flex flex-wrap justify-center space-x-2'>
        {whitelistStage && (
          <div className='flex flex-col space-y-2 text-center my-3 text-sm'>
            <span>
              {intl.formatMessage(
                {
                  id: 'landing.body.price_progress.nft_count',
                  defaultMessage: '{count} NFTs',
                },
                { count: whitelistStage.stepNftCount }
              )}
            </span>
            <span className='h-4 w-full rounded-md min-w-[8rem] sm:min-w-[10rem] bg-secondaryBg relative overflow-hidden'>
              <span
                className='absolute left-0 top-0 bottom-0 bg-primaryBg'
                style={{ width: `${whitelistStage.progress}%` }}
              />
            </span>
            <span className='opacity-40'>
              {`WL ${bigNumberToStr(whitelistStage.price, 2)} ${
                broxieStore.paymentTokenSymbol
              }`}
            </span>
          </div>
        )}
        {airdropStage && (
          <div className='flex flex-col space-y-2 text-center my-3 text-sm'>
            <span>
              {intl.formatMessage(
                {
                  id: 'landing.body.price_progress.nft_count',
                  defaultMessage: '{count} NFTs',
                },
                { count: airdropStage.stepNftCount }
              )}
            </span>
            <span className='h-4 w-full rounded-md min-w-[8rem] sm:min-w-[10rem] bg-primaryBg overflow-hidden' />
            <span className='opacity-40 uppercase'>Airdrop</span>
          </div>
        )}
      </div>
      <div className='flex flex-wrap justify-center items-center space-x-2 text-sm'>
        {regularPriceStages.map((x, i) => (
          <div
            key={i}
            className='flex flex-col space-y-2 text-center my-3 flex-grow-0'
            style={{ flexBasis: `${x.weight}%` }}
          >
            <span className='min-w-[90px]'>
              {intl.formatMessage(
                {
                  id: 'landing.body.price_progress.nft_count',
                  defaultMessage: '{count} NFTs',
                },
                { count: x.stepNftCount }
              )}
            </span>
            <span className='h-4 w-full rounded-md bg-secondaryBg relative overflow-hidden'>
              <span
                className='absolute left-0 top-0 bottom-0 bg-primaryBg'
                style={{ width: `${x.progress}%` }}
              />
            </span>
            <span className='opacity-40'>
              {bigNumberToStr(x.price, 2)} {broxieStore.paymentTokenSymbol}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default NftPriceProgress;
