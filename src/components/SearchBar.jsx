import { useDispatch, useSelector } from 'react-redux';
import { handleSearchDoa } from '../features/doa';
import { handleSearchSurat } from '../features/surat';
import { useEffect, useRef, useState } from 'react';
import { handleSearchJadwal } from '../features/jadwalSlice';

const SearchBar = ({ title }) => {
  const { allCity } = useSelector((store) => store.jadwal);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const [city, setCity] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    if (title === 'Doa') dispatch(handleSearchDoa(e.target.value));
    if (title === 'Surat') dispatch(handleSearchSurat(e.target.value));
    if (title === 'Lokasi') {
      const newCity = allCity.kota.filter((item) => item.nama.toLowerCase().includes(e.target.value.toLowerCase()));
      setCity(newCity);
    }
  };

  const handleClick = (e) => {
    dispatch(handleSearchJadwal({ nama: e.target.innerText.toLowerCase().trim(), id: e.target.dataset.id }));
    searchRef.current.value = e.target.innerText.toLowerCase();
    listRef.current.classList.add('hidden');
  };

  const handleFocus = (e) => {
    if (title === 'Lokasi') {
      listRef.current.classList.remove('hidden');
    }
  };

  useEffect(() => {
    setCity(allCity.kota);

    if (title === 'Lokasi') {
      const handleClick = (e) => {
        if (!e.target.closest('input')) listRef.current.classList.add('hidden');
      };
      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <form className="search-container" name="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-bar">Search</label>
      <div>
        <svg aria-hidden="true" fill="none" stroke="cyan" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input type="search" id="search-bar" placeholder={`Cari ${title || ''}...`} onChange={handleChange} ref={searchRef} onFocus={handleFocus} autoComplete="off" />
      {title === 'Lokasi' && (
        <ul className="w-full h-36 overflow-auto absolute rounded-md hidden" ref={listRef}>
          {city?.map((item) => {
            return (
              <li key={item.id} className="bg-white text-center py-1 hover:bg-lightBlue cursor-pointer" data-id={item.id} onClick={handleClick}>
                {item.nama}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
