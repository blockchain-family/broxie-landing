import { useDesktopMediaQuery } from 'utils/responsiveness';
import { ReactComponent as UtilitySvg } from 'assets/images/landing/utility.svg';
import { ReactComponent as UtilitySmSvg } from 'assets/images/landing/utility-sm.svg';

const UtilityButton = () => {
  const isDesktop = useDesktopMediaQuery();

  return (
    <div className='relative mx-auto px-4 text-center'>
      {isDesktop ? (
        <UtilitySvg className='w-full max-w-2xl h-auto' />
      ) : (
        <UtilitySmSvg className='w-full max-w-xs h-auto' />
      )}

      <div className='absolute bottom-[14%] sm:bottom-[18%] px-16 sm:px-32'>
        Each Broxie comes with utilities that will give you preferences and
        additional benefits from using Broxus products. Cool utility mechanics
        will be implemented in the foreseeable future, don't miss your chance to
        profit!
      </div>
    </div>
  );
};

export default UtilityButton;
