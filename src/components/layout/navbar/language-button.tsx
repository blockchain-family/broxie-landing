import { Menu, MenuItem } from '@szhsin/react-menu';
import Button from 'components/core/button';
import { observer } from 'mobx-react-lite';
import { useLanguageStore } from 'providers/IntlProvider';

const LanguageButton = observer(({ className }: { className?: string }) => {
  const languageStore = useLanguageStore();

  const flagClassName = 'w-7 h-auto shrink-0 rounded-sm';

  return (
    <div className={className}>
      <Menu
        menuButton={
          <Button variant='secondary' onClick={() => {}} roundedFull>
            {languageStore.language.getIcon(flagClassName)}
          </Button>
        }
        menuClassName='bg-background/80 py-1 px-4 rounded-md min-w-[14rem]'
        align='start'
        offsetY={20}
      >
        {languageStore.availableLanguages.map((x) => (
          <MenuItem
            key={x.id}
            onClick={() => languageStore.setLanguage(x)}
            className='cursor-pointer text-lg flex items-center space-x-3 my-3'
          >
            {x.getIcon(flagClassName)}
            <span>{x.text}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});

export default LanguageButton;
