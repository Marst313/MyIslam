import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQariOnPlay, getOneSurat, pauseAudio, playAudio, setActiveQuran, setIsLoading, setMusicBar } from '../features/surat';
import { useEffect, useRef, useState } from 'react';
import { ControlAudio, Loading, LoadingMusic } from './';
import { formatDuration } from '../utils/helper';

const Musicbar = () => {
  const { currentSurat, isPlaying, isActive, qari, duration, openSurat, surat, isLoadingMusic, isLoading } = useSelector((store) => store.surat);
  const dispatch = useDispatch();

  const audioRef = useRef(null);
  const durationRef = useRef(null);
  const volumeRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayAudio = () => {
    dispatch(playAudio());
    audioRef.current.play();
  };

  const handleChangeVolume = (e) => {
    if (!muted) setMuted(true);
    let value = e.target.value;
    setVolume(value);
    audioRef.current.volume = value;
    e.target.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 ${value * 100}%, #ffffff ${value * 100}%, #ffffff 100%)`;
  };

  const handleChangeDuration = (e) => {
    const { value } = e.target;
    if (!isPlaying) {
      dispatch(playAudio());
      audioRef.current.play();
    }
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const handleStopAudio = () => {
    dispatch(pauseAudio());
    audioRef.current.pause();
    setCurrentTime(0);
    if (!durationRef.current) return;
    durationRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 0%, #ffffff 0%, #ffffff 100%)`;
  };

  const handleOnTimeUpdate = () => {
    const currentTimePercentage = (audioRef.current.currentTime / duration) * 100;
    if (isLoadingMusic) return;
    if (!durationRef.current) return;
    durationRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 ${currentTimePercentage}%, #ffffff ${currentTimePercentage}%, #ffffff 100%)`;
    setCurrentTime(audioRef.current.currentTime.toFixed());
  };

  const handleCloseMusicBar = () => {
    dispatch(setMusicBar(false));
  };
  const handleChangeSurat = (category) => {
    if (!category) return;
    dispatch(getOneSurat(category.nomor));
    dispatch(setIsLoading(true));

    surat.find((item) => {
      if (item.nomor === category.nomor) {
        const { nomor, namaLatin: latin, jumlahAyat: ayat, tempatTurun, nama, audioFull } = item;
        const src = `${item.audioFull[qari]}`;
        const audio = new Audio(src);
        audio.addEventListener('canplaythrough', () => {
          let duration = audio.duration.toFixed();
          dispatch(setActiveQuran({ src, nomor, latin, ayat, tempatTurun, nama, duration, audioFull }));
          dispatch(setIsLoading(false));
          dispatch(playAudio());
        });
        audio.load();
      }
    });
  };

  useEffect(() => {
    const handleLoadedMetadata = () => {
      dispatch(changeQariOnPlay(audioRef.current?.duration?.toFixed()));
    };
    if (isActive) {
      audioRef.current.src = currentSurat.audioFull[qari];
      audioRef.current.load();
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      dispatch(playAudio());
      return () => audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, [qari]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, []);

  useEffect(() => {
    if (!volume.current) return;
    volumeRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 ${volume * 100}%, #ffffff ${volume * 100}%, #ffffff 100%)`;
  }, [currentSurat]);

  return (
    <div className={`${isActive ? 'translate-y-0 opacity-100' : ' translate-y-full opacity-0'}  music-bar `}>
      <audio src={currentSurat.src || ''} autoPlay ref={audioRef} onEnded={handleStopAudio} onTimeUpdate={handleOnTimeUpdate} />
      {isLoadingMusic || isLoading ? (
        <LoadingMusic />
      ) : (
        <>
          <div>
            <h1>{currentSurat.latin}</h1>
            <h3>{currentSurat.ayat} Ayat</h3>
          </div>

          <div>
            <ControlAudio isPlaying={isPlaying} handlePlayAudio={handlePlayAudio} handleStopAudio={handleStopAudio} handleChangeSurat={handleChangeSurat} {...openSurat} />
            <div>
              <p>{formatDuration(currentTime)}</p>
              <input type="range" min="0" max={duration} value={currentTime || 0} onChange={handleChangeDuration} onClick={handleChangeDuration} className="slider-duration " ref={durationRef} />
              <p>{formatDuration(duration)}</p>
            </div>
          </div>

          <div>
            <button
              type="button"
              className={`${muted ? 'opacity-0 hidden' : 'opacity-100'} `}
              onClick={() => {
                setMuted(true);
                setVolume(1);
                audioRef.current.volume = 1;
                volumeRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 100%, #ffffff 100%, #ffffff 100%)`;
              }}
            >
              <Icon icon="solar:muted-line-duotone" />
            </button>
            <button type="button" className={`${muted ? 'opacity-100' : 'opacity-0 hidden'} `}>
              <Icon
                icon="ic:baseline-volume-up"
                onClick={() => {
                  setMuted(false);
                  audioRef.current.volume = 0;
                  setVolume(audioRef.current.volume);
                  volumeRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 ${0}%, #ffffff ${0}%, #ffffff 100%)`;
                }}
              />
            </button>
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleChangeVolume} ref={volumeRef} className="slider-volume  " />
          </div>

          <button type="button" onClick={handleCloseMusicBar}>
            <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
          </button>
        </>
      )}
    </div>
  );
};

export default Musicbar;
