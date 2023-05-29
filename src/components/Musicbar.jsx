import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQariOnPlay, getOneSurat, pauseAudio, playAudio, setActiveQuran, setMusicBar } from '../features/surat';
import { useEffect, useRef, useState } from 'react';
import { ControlAudio } from './';
import { formatDuration } from '../utils/helper';

const Musicbar = () => {
  const { currentSurat, isPlaying, isActive, qari, duration, openSurat, surat } = useSelector((store) => store.surat);
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
    durationRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 0%, #ffffff 0%, #ffffff 100%)`;
  };

  const handleOnTimeUpdate = () => {
    const currentTimePercentage = (audioRef.current.currentTime / duration) * 100;
    if (durationRef && isPlaying) {
      durationRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 ${currentTimePercentage}%, #ffffff ${currentTimePercentage}%, #ffffff 100%)`;
    }
    setCurrentTime(audioRef.current.currentTime.toFixed());
  };

  const handleCloseMusicBar = () => {
    dispatch(setMusicBar(false));
  };

  const handleNextSurat = () => {
    if (!openSurat.suratSelanjutnya) return;
    dispatch(getOneSurat(openSurat?.suratSelanjutnya?.nomor));

    surat.find((item) => {
      if (item.nomor === openSurat.suratSelanjutnya.nomor) {
        const { nomor, namaLatin: latin, jumlahAyat: ayat, tempatTurun, nama, audioFull } = item;
        const src = `${item.audioFull[qari]}`;
        const audio = new Audio(src);
        audio.addEventListener('canplaythrough', () => {
          let duration = audio.duration.toFixed();
          dispatch(setActiveQuran({ src, nomor, latin, ayat, tempatTurun, nama, duration, audioFull }));
          dispatch(playAudio());
        });
        audio.load();
      }
    });
  };
  const handlePrevSurat = () => {
    if (!openSurat.suratSebelumnya) return;
    dispatch(getOneSurat(openSurat?.suratSebelumnya?.nomor));

    surat.find((item) => {
      if (item.nomor === openSurat.suratSebelumnya.nomor) {
        const { nomor, namaLatin: latin, jumlahAyat: ayat, tempatTurun, nama, audioFull } = item;
        const src = `${item.audioFull[qari]}`;
        const audio = new Audio(src);
        audio.addEventListener('canplaythrough', () => {
          let duration = audio.duration.toFixed();
          dispatch(setActiveQuran({ src, nomor, latin, ayat, tempatTurun, nama, duration, audioFull }));
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

  useEffect(() => {}, [currentSurat]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, []);

  return (
    <div className={`${isActive ? 'translate-y-0 opacity-100' : ' translate-y-full opacity-0'}  music-bar `}>
      <audio src={currentSurat.src || ''} autoPlay ref={audioRef} onEnded={handleStopAudio} onTimeUpdate={handleOnTimeUpdate} />

      <div>
        <h1>{currentSurat.latin}</h1>
        <h3>{currentSurat.ayat} Ayat</h3>
      </div>

      <div>
        <div className="flex-center gap-1 lg:gap-5 mt-7 lg:text-base mr-14 relative  text-xs text-white  ">
          <ControlAudio isPlaying={isPlaying} handlePlayAudio={handlePlayAudio} handleStopAudio={handleStopAudio} handleNextSurat={handleNextSurat} handlePrevSurat={handlePrevSurat} {...openSurat} />
          <p>{formatDuration(currentTime)}</p>

          <input type="range" min="0" max={duration} value={currentTime || 0} onChange={handleChangeDuration} onClick={handleChangeDuration} className="slider-duration " ref={durationRef} />

          <p>{formatDuration(duration)}</p>
        </div>

        <div>
          <button
            type="button"
            className={`${muted ? 'opacity-0 hidden' : 'opacity-100'}  w-8 flex-center  mt-7 lg:absolute lg:right-48  transition-all`}
            onClick={() => {
              setMuted(true);
              setVolume(1);
              audioRef.current.volume = 1;
              volumeRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 100%, #ffffff 100%, #ffffff 100%)`;
            }}
          >
            <Icon icon="solar:muted-line-duotone" className="text-white/70 hover:scale-105 mr-2 hover:text-white transition-all w-5 h-5 lg:w-[35px] lg:h-[35px]" />
          </button>
          <button type="button" className={`${muted ? 'opacity-100' : 'opacity-0 hidden'} w-8 flex-center mt-7 lg:absolute lg:right-48`}>
            <Icon
              icon="ic:baseline-volume-up"
              className="text-white/70 hover:scale-105 mr-2 hover:text-white transition-all w-5 h-5 lg:w-[35px] lg:h-[35px] "
              onClick={() => {
                setMuted(false);
                audioRef.current.volume = 0;
                setVolume(audioRef.current.volume);
                volumeRef.current.style.background = `linear-gradient(to right, #2feb45 0%, #2feb45 ${0}%, #ffffff ${0}%, #ffffff 100%)`;
              }}
            />
          </button>
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleChangeVolume} ref={volumeRef} className={`slider-volume lg:w-40 lg:right-10  lg:absolute bg-[#2feb45]`} />
        </div>
      </div>

      <button type="button" onClick={handleCloseMusicBar}>
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
      </button>
    </div>
  );
};

export default Musicbar;
