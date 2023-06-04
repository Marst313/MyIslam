import axios from 'axios';

export const customFetch = axios.create({
  baseURL: 'https://equran.id/api/v2/',
});

export const customFetchDoa = axios.create({
  baseURL: 'https://islamic-api-zhirrr.vercel.app/api/doaharian',
});

export const customFetchJadwal = axios.create({
  baseURL: 'https://private-amnesiac-57e33-fathimah.apiary-proxy.com/sholat/format//jadwal/kota/',
  headers: { 'Content-Type': 'application/json' },
});

export const customFetchGeolocation = axios.create({
  baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
  params: {
    key: import.meta.env.VITE_GEO_API_KEY,
  },
});

export const customFetchAllCity = axios.create({
  baseURL: 'https://api.banghasan.com/sholat/format/json/kota',
});
