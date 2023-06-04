import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { allCityThunk, geoLocationThunk, jadwalThunk, locationThunk } from './jadwalThunk';

const initialState = {
  search: '',
  dataLokasi: {},
  jadwalSholat: {},
  error: 0,
  isLoading: true,
  currentLocation: {},
  errorMessage: '',
  allCity: [],
  id: 0,
};

export const getAllCity = createAsyncThunk('city', allCityThunk);
export const getGeolocation = createAsyncThunk('geolocation', geoLocationThunk);
export const getJadwalSholat = createAsyncThunk('jadwalSholat', jadwalThunk);
export const getLocation = createAsyncThunk('location', locationThunk);

export const jadwalSlice = createSlice({
  name: 'jadwal',
  initialState,
  reducers: {
    handleSearchLocation: (state, { payload }) => {
      state.search = payload;
    },
    handleSearchJadwal: (state, { payload }) => {
      state.search = payload.nama;
      if (payload.nama.includes('kota')) {
        state.search = payload.nama.replace('kota', '').trim();
      }
      state.id = payload.id;
    },

    setError: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
      state.errorMessage = `${payload.msg} please turn on your gps !`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        state.isLoading = true;
        state.error = 0;
      })
      .addCase(getLocation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dataLokasi = payload;
      })
      .addCase(getLocation.rejected, (state) => {
        state.isLoading = false;

        state.error = 1;
        state.errorMessage = 'Tidak bisa menampilkan lokasi hidupkan GPS anda !!!';
      })
      .addCase(getJadwalSholat.pending, (state) => {
        state.error = 0;
        state.isLoading = true;
      })
      .addCase(getJadwalSholat.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jadwalSholat = payload;
      })
      .addCase(getJadwalSholat.rejected, (state) => {
        state.isLoading = false;
        state.error = 1;
        state.errorMessage = `Tidak bisa menemukan jadwal Shalat di ${state.search} !!!`;
      })
      .addCase(getGeolocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeolocation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = 0;
        state.currentLocation = { latitude: payload.latitude, longitude: payload.longitude, address: payload.address, ...payload };
      })
      .addCase(getGeolocation.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = 1;
        state.errorMessage = payload;
      })
      .addCase(getAllCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCity.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allCity = payload;
      })
      .addCase(getAllCity.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { handleSearchLocation, handleSearchJadwal, setError } = jadwalSlice.actions;
export default jadwalSlice.reducer;
