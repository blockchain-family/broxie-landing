import Button from 'components/core/button';
import { observer } from 'mobx-react-lite';
import { useMusicStore } from 'providers/BackgroundMusicProvider';
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs';

const MusicButton = observer(() => {
  const musicStore = useMusicStore();

  return (
    <Button
      variant='secondary'
      onClick={() => {
        musicStore.playing === true ? musicStore.pause() : musicStore.play();
      }}
      roundedFull
    >
      <span className='text-3xl'>
        {musicStore.playing ? <BsVolumeUp /> : <BsVolumeMute />}
      </span>
    </Button>
  );
});

export default MusicButton;
