import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Heading, Description } from './';
import { useEffect, useRef, useState } from 'react';

const OpenSuratHeading = ({ namaLatin, arti, tempatTurun, jumlahAyat, deskripsi }) => {
  const descRef = useRef(null);
  const [openDesc, setOpenDesc] = useState(false);

  return (
    <>
      <div className="container-open_surat_heading ">
        <Link to="/">
          <Icon icon="ic:round-keyboard-arrow-left" />
        </Link>
        <div>
          <h2>{namaLatin}</h2>
          <p>({arti})</p>
          <p>
            {tempatTurun} : {jumlahAyat} Ayat
          </p>
        </div>
        <button type="button" onClick={() => setOpenDesc(true)} ref={descRef}>
          <Icon icon="mdi:book-open-page-variant-outline" />
        </button>
      </div>
      <Heading />
      <h2>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
      <hr />
      {openDesc && <Description openDesc={openDesc} deskripsi={deskripsi} setOpenDesc={setOpenDesc} />}
    </>
  );
};

export default OpenSuratHeading;
