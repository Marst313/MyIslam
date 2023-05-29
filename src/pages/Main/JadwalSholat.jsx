import React, { useEffect } from 'react';
import { Footer, Loading, SearchBar, Time } from '../../components/';
import { useDispatch, useSelector } from 'react-redux';
import { getGeolocation, getJadwalSholat, getLocation, handleSearchLocation, setError } from '../../features/jadwalSlice';
import { convert12HourTo24Hour } from '../../utils/helper';
import Error from '../Error';

const JadwalSholat = () => {
  const dispatch = useDispatch();
  const { dataLokasi, isLoading, jadwalSholat, search, currentLocation, error, errorMessage } = useSelector((store) => store.jadwal);

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
    if (dataLokasi.city) {
      dispatch(getJadwalSholat(dataLokasi.city.toLowerCase()));
    }
  }, [dataLokasi]);

  useEffect(() => {
    if (search) {
      dispatch(getGeolocation(search));
      dispatch(handleSearchLocation(search));
    }
  }, [search]);

  useEffect(() => {
    if (currentLocation.address) {
      dispatch(getLocation({ lat: currentLocation.latitude, longt: currentLocation.longitude }));
    }
    /* */
  }, [currentLocation]);

  if (isLoading) return <Loading />;
  if (error) return <Error msg={errorMessage} />;
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
                <h3>{currentLocation.resolvedAddress}</h3>
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
            {Object.keys(jadwalSholat).length > 0 ? (
              Object.entries(jadwalSholat?.items[0])?.map(([key, value]) => {
                if (key !== 'date_for')
                  return (
                    <li key={key}>
                      <h3>{key}</h3>
                      <p>{convert12HourTo24Hour(value)}</p>
                    </li>
                  );
              })
            ) : (
              <Loading />
            )}
          </ul>
        </>
      )}
      <Footer />
    </main>
  );
};

export default JadwalSholat;
