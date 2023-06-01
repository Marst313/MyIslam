import number from '../assets/images/number.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playAudio, setActiveQuran, setIsLoading } from '../features/surat';
import Loading from './Loading';
const OneSurat = ({ nomor, namaLatin: latin, jumlahAyat: ayat, tempatTurun, nama, audioFull }) => {
  const { qari, isPlaying, isActive } = useSelector((store) => store.surat);
  const dispatch = useDispatch();

  let leftPosition = 'left-[3.5rem]';
  if (nomor > 9) leftPosition = 'left-[3.3rem]';
  if (nomor > 99) leftPosition = 'left-[3.1rem]';

  const handlePlay = () => {
    dispatch(setIsLoading(true));
    const src = `${audioFull[qari]}`;
    const audio = new Audio(src);

    audio.addEventListener('canplaythrough', (e) => {
      dispatch(setIsLoading(false));

      let duration = audio.duration.toFixed();
      dispatch(setActiveQuran({ src, nomor, latin, ayat, tempatTurun, nama, duration, audioFull }));
      dispatch(playAudio());
    });

    audio.load();
  };

  return (
    <Link className="container-one_surat" onClick={handlePlay} to={`/surat/${nomor}`}>
      <div>
        <img src={number} alt="number-icon" />
        <h1 className={`absolute text-xs ${leftPosition}`}>{nomor}</h1>
        <div>
          <h2>{latin}</h2>
          <h3>
            {tempatTurun} <span>{ayat} Ayat</span>
          </h3>
        </div>
      </div>
      <h3>{nama}</h3>
    </Link>
  );
};

export default OneSurat;
