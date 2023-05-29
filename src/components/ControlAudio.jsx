import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const ControlDuration = ({ isPlaying, handlePlayAudio, handleStopAudio, handleNextSurat, handlePrevSurat, suratSebelumnya, suratSelanjutnya }) => {
  return (
    <div className="container-control_audio">
      <Link type="button" onClick={handlePrevSurat} to={suratSebelumnya && `/surat/${suratSebelumnya?.nomor}`}>
        <Icon icon="tabler:player-track-prev-filled" />
      </Link>
      <button type="button">{isPlaying ? <Icon icon="material-symbols:stop-circle-rounded" onClick={handleStopAudio} /> : <Icon icon="material-symbols:play-circle-rounded" onClick={handlePlayAudio} />}</button>
      <Link type="button" onClick={handleNextSurat} to={suratSelanjutnya && `/surat/${suratSelanjutnya.nomor}`}>
        <Icon icon="tabler:player-track-next-filled" />
      </Link>
    </div>
  );
};

export default ControlDuration;
