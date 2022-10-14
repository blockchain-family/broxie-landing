import BroxieRoutes from 'routes';
import UtilityInfo from './utility-info';

const Utility = () => {
  return (
    <div id={BroxieRoutes.index.elements.utility} className='px-4 space-y-10'>
      <div className='mx-auto max-w-3xl'>
        <UtilityInfo type='main' />
      </div>

      <div className='mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10'>
        <UtilityInfo type='flatqube' className='md:mt-28' />
        <UtilityInfo type='vip' />
      </div>

      <div className='mx-auto max-w-2xl'>
        <UtilityInfo type='join_everscale' />
      </div>
    </div>
  );
};

export default Utility;
