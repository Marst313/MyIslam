import axios from 'axios';

export const customFetch = axios.create({
  baseURL: 'https://equran.id/api/v2/',
});

export const customFetchDoa = axios.create({
  baseURL: 'https://islamic-api-zhirrr.vercel.app/api/doaharian',
});

export const customFetchJadwal = axios.create({
  baseURL: 'https://cdn.statically.io/gh/lakuapik/jadwalsholatorg/master/adzan/',
});

export const customFetchGeolocation = axios.create({
  baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
  params: {
    key: import.meta.env.VITE_GEO_API_KEY,
  },
});
