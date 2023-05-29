import { useDispatch, useSelector } from 'react-redux';
import { handleSearchDoa } from '../features/doa';
import { handleSearchSurat } from '../features/surat';
import { handleSearchLocation } from '../features/jadwalSlice';
import { useEffect, useRef } from 'react';

const SearchBar = ({ title }) => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    if (title === 'Doa') dispatch(handleSearchDoa(e.target.value));
    if (title === 'Surat') dispatch(handleSearchSurat(e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchRef.current.value) return;
    if (title === 'Lokasi') {
      dispatch(handleSearchLocation(searchRef.current.value?.toLowerCase().trim()));
    }
    searchRef.current.value = '';
  };

  return (
    <form className="search-container" onSubmit={handleSubmit} name="search">
      <label htmlFor="search-bar">Search</label>
      <div>
        <svg aria-hidden="true" fill="none" stroke="cyan" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input type="search" id="search-bar" placeholder={`Cari ${title || ''}...`} onChange={handleChange} ref={searchRef} />
    </form>
  );
};

export default SearchBar;
