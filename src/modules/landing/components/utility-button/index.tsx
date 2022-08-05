import { ReactComponent as UtilitySvg } from 'assets/images/landing/utility.svg';
import { ReactComponent as UtilitySmSvg } from 'assets/images/landing/utility-sm.svg';

const UtilityButton = () => {
  return (
    <div className='relative mx-auto max-w-2xl px-4 text-center'>
      <UtilitySvg className='hidden sm:block w-full h-auto' />
      <UtilitySmSvg className='sm:hidden w-full max-w-xs h-auto' />

      <div className='absolute bottom-[14%] px-16 sm:px-32'>
        Each Broxie comes with utilities that will give you preferences and
        additional benefits from using Broxus products. Cool utility mechanics
        will be implemented in the foreseeable future, don't miss your chance to
        profit!
      </div>
    </div>
  );
};

export default UtilityButton;
