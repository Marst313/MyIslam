import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { customFetchGeolocation, customFetchJadwal } from '../utils/axios';

const initialState = {
  search: '',
  dataLokasi: {},
  jadwalSholat: {},
  error: 0,
  isLoading: true,
  currentLocation: {},
  errorMessage: '',
};

const locationThunk = async (lokasi, thunkAPI) => {
  try {
    const resp = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lokasi.lat}&longitude=${lokasi.longt}&localitiLanguage=en`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
const jadwalThunk = async (lokasi, thunkAPI) => {
  try {
    const resp = await customFetchJadwal(`${lokasi || lokasi}.json`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

const geoLocationThunk = async (lokasi, thunkAPI) => {
  try {
    const resp = await customFetchGeolocation(`${lokasi}?`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

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
        state.errorMessage = 'Cannot get your location please turn on your gps !';
      })
      .addCase(getJadwalSholat.pending, (state) => {
        state.error = 0;
        state.isLoading = true;
      })
      .addCase(getJadwalSholat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jadwalSholat = action.payload;
        if (action.payload.status_code === 0) {
          state.error = 1;
          state.errorMessage = action.payload.status_error.invalid_query;
          state.search = '';
        }
      })
      .addCase(getJadwalSholat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 1;
      })
      .addCase(getGeolocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeolocation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = 0;
        state.currentLocation = { latitude: payload.latitude, longitude: payload.longitude, address: payload.address, ...payload };
      })
      .addCase(getGeolocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 1;
        state.errorMessage = `Silahkan cari ulang tidak ada kota dengan nama ${action.meta.arg} !!!`;
      });
  },
});

export const { handleSearchLocation, setError } = jadwalSlice.actions;
export default jadwalSlice.reducer;
