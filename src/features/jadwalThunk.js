import axios from 'axios';
import { customFetchAllCity, customFetchGeolocation, customFetchJadwal } from '../utils/axios';

export const locationThunk = async (lokasi, thunkAPI) => {
  try {
    const resp = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lokasi.lat}&longitude=${lokasi.longt}&localitiLanguage=en`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const jadwalThunk = async (lokasi, thunkAPI) => {
  try {
    const date = new Date();
    const tanggal = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const bulan = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();

    const resp = await axios.get(`https://private-amnesiac-57e33-fathimah.apiary-proxy.com/sholat/format/json/jadwal/kota/${lokasi}/tanggal/${date.getFullYear()}-${bulan}-${tanggal}`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const geoLocationThunk = async (lokasi, thunkAPI) => {
  try {
    const resp = await customFetchGeolocation(`${lokasi.replace('-', '').replace(' ', '')}?`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const allCityThunk = async (state, thunkAPI) => {
  try {
    const resp = await customFetchAllCity();

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
