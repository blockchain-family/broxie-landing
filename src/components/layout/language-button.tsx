import { Menu, MenuItem } from '@szhsin/react-menu';
import Button from 'components/core/button';
import { GB, ID, KR } from 'country-flag-icons/react/3x2';

type Language = {
  text?: string;
  icon?: JSX.Element;
  onClick: () => void;
};

const LanguageButton = ({ className }: { className?: string }) => {
  const flagClassName = 'w-7 h-auto shrink-0';
  const actions: Language[] = [
    {
      icon: <GB className={flagClassName} />,
      text: ' English',
      onClick: () => {},
    },
    {
      icon: <KR className={flagClassName} />,
      text: '한국어',
      onClick: () => {},
    },
    {
      icon: <ID className={flagClassName} />,
      text: 'Bahasa Indonesia',
      onClick: () => {},
    },
  ];

  return (
    <div className={className}>
      <Menu
        menuButton={
          <Button variant='secondary' onClick={() => {}} roundedFull>
            <GB className={flagClassName} />
          </Button>
        }
        menuClassName='bg-primary/20 py-1 px-4 rounded-md min-w-[14rem]'
        align='start'
        offsetY={20}
      >
        {actions.map((x, index) => (
          <MenuItem
            key={index}
            onClick={x.onClick}
            className='cursor-pointer text-primary-1 hover:text-success-1 text-lg flex items-center space-x-3 my-3'
          >
            {x.icon}
            <span>{x.text}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageButton;
