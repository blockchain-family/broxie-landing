import { ReactComponent as UtilitySvg } from 'assets/images/landing/utility.svg';
import { ReactComponent as UtilitySmSvg } from 'assets/images/landing/utility-sm.svg';
import { useSmMediaQuery } from 'utils/responsiveness';

const UtilityButton = () => {
  const isDesktop = useSmMediaQuery();

  return (
    <div className='relative mx-auto px-4 text-center'>
      {isDesktop ? (
        <UtilitySvg className='w-full max-w-2xl h-auto' />
      ) : (
        <UtilitySmSvg className='w-full max-w-xs h-auto' />
      )}

      <div
        className={
          'absolute top-[28%] sm:top-[48%] bottom-[2%] left-[15%] right-[15%] ' +
          'flex justify-center items-center overflow-hidden px-6 sm:px-10'
        }
      >
        <span>
          Each Broxie comes with utilities that will give you preferences and
          additional benefits from using Broxus products. Cool utility mechanics
          will be implemented in the foreseeable future, don't miss your chance
          to profit!
        </span>
      </div>
    </div>
  );
};

export default UtilityButton;
