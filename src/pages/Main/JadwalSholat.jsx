import React, { useEffect, useState } from 'react';
import { Footer, Loading, SearchBar, Time } from '../../components/';
import { useDispatch, useSelector } from 'react-redux';
import { getGeolocation, getJadwalSholat, getLocation, handleSearchLocation, setError } from '../../features/jadwalSlice';
import Error from '../Error';

const JadwalSholat = () => {
  const dispatch = useDispatch();
  const { dataLokasi, isLoading, jadwalSholat, search, currentLocation, error, errorMessage, allCity, id } = useSelector((store) => store.jadwal);
  const [dataJadwal, setDataJadwal] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(getLocation({ lat: position.coords.latitude, longt: position.coords.longitude }));
        },
        (data) => {
          dispatch(setError({ error: data.code, msg: data.message }));
        }
      );
    }
  }, []);

  useEffect(() => {
    if (search) {
      dispatch(getGeolocation(search));
      dispatch(handleSearchLocation(search));
      dispatch(getJadwalSholat(id));
    }
  }, [search]);

  useEffect(() => {
    if (Object.entries(jadwalSholat).length > 0) {
      setDataJadwal(jadwalSholat.jadwal.data);
    }
  }, [jadwalSholat]);

  useEffect(() => {
    if (currentLocation.address) {
      dispatch(getLocation({ lat: currentLocation.latitude, longt: currentLocation.longitude }));
    }
    /* */
  }, [currentLocation]);

  if (isLoading) return <Loading />;
  return (
    <main className="container-jadwal">
      <SearchBar title="Lokasi" />
      <button>Jadwal Sholat</button>
      <hr />

      {error ? (
        <Error msg={errorMessage} />
      ) : (
        <>
          <section>
            <Time />
            <div>
              {currentLocation.resolvedAddress ? (
                <h3>{currentLocation.resolvedAddress || search}</h3>
              ) : (
                <>
                  <h3>{dataLokasi.locality},</h3>
                  <h3>{dataLokasi.city},</h3>
                  <h3>{dataLokasi.countryName}</h3>
                </>
              )}
            </div>
          </section>

          <ul>
            {Object.entries(dataJadwal).length > 0 ? (
              Object.entries(dataJadwal).map((key, index) => {
                if (key[0] === 'tanggal' || key[0] === 'terbit') {
                  return (
                    <li className="capitalize order-first  ">
                      <h3>{key[0]}</h3>
                      <p>{key[1]}</p>
                    </li>
                  );
                }

                return (
                  <li key={index}>
                    <h3>{key[0]}</h3>
                    <p>{key[1]}</p>
                  </li>
                );
              })
            ) : (
              <h1>Silahkan mencari jadwal Shalat... </h1>
            )}
          </ul>
        </>
      )}
      <Footer />
    </main>
  );
};

export default JadwalSholat;
