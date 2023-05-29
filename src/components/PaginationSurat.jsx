import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { clickNumberPage, nextPage, prevPage } from '../features/surat';

const PaginationSurat = () => {
  const { surat, currentPage } = useSelector((store) => store.surat);
  const dispatch = useDispatch();

  const handleNextSuratPage = () => {
    dispatch(nextPage(currentPage));
  };
  const handlePrevSuratPage = () => {
    dispatch(prevPage(currentPage));
  };
  const handleClickPage = (e) => {
    dispatch(clickNumberPage(+e.target.innerHTML));
  };

  return (
    <div className="container-pagination">
      <button type="button" className="btn-page group" onClick={handlePrevSuratPage}>
        <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" className="rotate-180" />
        <p>Sebelumnya</p>
      </button>
      <ul>
        {Array.from({ length: Math.ceil(surat.length / 10) }).map((_, index) => (
          <li key={index}>
            <button className={`${currentPage === index + 1 ? 'bg-cyan shadow-page text-blueDark ' : 'bg-white/80 hover:bg-cyan '} `} onClick={handleClickPage}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="btn-page group" onClick={handleNextSuratPage}>
        <p>Selanjutnya</p>
        <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" />
      </button>
    </div>
  );
};

export default PaginationSurat;
