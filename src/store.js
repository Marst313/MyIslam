import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user';
import suratSlice from './features/surat';
import doaSlice from './features/doa';
import jadwalSlice from './features/jadwalSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    surat: suratSlice,
    doa: doaSlice,
    jadwal: jadwalSlice,
  },
});
