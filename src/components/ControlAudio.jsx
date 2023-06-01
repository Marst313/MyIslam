import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ControlDuration = ({ isPlaying, handlePlayAudio, handleStopAudio, handleChangeSurat, suratSebelumnya, suratSelanjutnya }) => {
  const { openSurat } = useSelector((store) => store.surat);

  return (
    <div className="container-control_audio">
      <Link type="button" onClick={() => handleChangeSurat(openSurat.suratSebelumnya)} to={suratSebelumnya && `/surat/${suratSebelumnya?.nomor}`}>
        <Icon icon="tabler:player-track-prev-filled" />
      </Link>
      <button type="button">{isPlaying ? <Icon icon="material-symbols:stop-circle-rounded" onClick={handleStopAudio} /> : <Icon icon="material-symbols:play-circle-rounded" onClick={handlePlayAudio} />}</button>
      <Link type="button" onClick={() => handleChangeSurat(openSurat.suratSelanjutnya)} to={suratSelanjutnya && `/surat/${suratSelanjutnya.nomor}`}>
        <Icon icon="tabler:player-track-next-filled" />
      </Link>
    </div>
  );
};

export default ControlDuration;
