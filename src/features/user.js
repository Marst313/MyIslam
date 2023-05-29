import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, setToLocalStorage } from '../utils/localStorage';

const initialState = {
  openApp: false,
  isSidebarOpen: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startApp: (state) => {
      getLocalStorage();
      state.openApp = true;
      setToLocalStorage(state.openApp);
    },
    endApp: (state) => {
      state.openApp = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { endApp, startApp, openSidebar, closeSidebar } = userSlice.actions;

export default userSlice.reducer;
