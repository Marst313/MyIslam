import { useEffect, useState } from 'react';
import { Footer, Loading, OneDoa, SearchBar } from '../../components';
import { handleSearchDoa, searchDoa } from '../../features/doa';
import { useDispatch, useSelector } from 'react-redux';

const Doa = () => {
  const { doas, isLoading, search, allDoas } = useSelector((store) => store.doa);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleSearchDoa(''));
  }, []);

  useEffect(() => {
    const newDoas = allDoas?.map((doa) => {
      return doa;
    });
    const result = newDoas?.filter((doa) => doa.title.toLowerCase().includes(search.toLowerCase()));

    dispatch(searchDoa(result));
  }, [search, allDoas]);

  if (isLoading) <Loading />;

  return (
    <main className="container-doa">
      <SearchBar title="Doa" />
      <button>Doa</button>
      <hr />
      {doas.length === 0 ? (
        <h1 className="text-center my-10 dark:text-cyan ">Tidak ada doa yang dicari !</h1>
      ) : (
        <section>
          {doas?.map((doa, index) => {
            return <OneDoa key={index} {...doa} index={index} />;
          })}
        </section>
      )}

      <Footer />
    </main>
  );
};

export default Doa;
