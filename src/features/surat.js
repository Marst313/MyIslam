import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customFetch } from '../utils/axios';

const initialState = {
  isLoading: false,
  qari: '01',
  types: 'Surat',
  allSurat: [],
  surat: [],
  tafsir: {},
  currentPage: 1,
  firstPage: 0,
  lastPage: 10,
  isPlaying: false,
  isActive: false,
  currentSurat: {},
  duration: 0,
  openSurat: [],
  search: '',
  isLoadingMusic: false,
};
const tafsirThunk = async (surat, thunkAPI) => {
  try {
    const resp = await customFetch.get(`tafsir/${surat}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

const equranThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('surat');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
const suratThunk = async (id, thunkAPI) => {
  try {
    const resp = await customFetch.get(`surat/${id}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const getSurat = createAsyncThunk('surat', equranThunk);
export const getOneSurat = createAsyncThunk('onesurat', suratThunk);
export const getTafsir = createAsyncThunk('tafsir', tafsirThunk);

export const suratSlice = createSlice({
  name: 'surat',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoadingMusic = payload;
    },
    handleSearchSurat: (state, { payload }) => {
      state.search = payload;
    },
    searchSurat: (state, { payload }) => {
      state.surat = payload;
    },
    changeQari: (state, { payload }) => {
      state.qari = payload;
    },
    changeType: (state, { payload }) => {
      state.types = payload;
    },
    setActiveQuran: (state, { payload }) => {
      state.currentSurat = payload;
      state.duration = payload.duration;
      state.isPlaying = true;
      state.isActive = true;
      state.search = '';
    },
    setMusicBar: (state, { payload }) => {
      state.isActive = payload;
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
    playAudio: (state) => {
      state.isPlaying = true;
      state.isActive = true;
    },
    changeQariOnPlay: (state, { payload }) => {
      state.duration = payload;
    },
    nextPage: (state, { payload }) => {
      if (state.lastPage < 120) {
        state.firstPage += 10;
        state.lastPage += 10;
        state.currentPage = payload + 1;
      } else {
        state.firstPage = 0;
        state.lastPage = 10;
        state.currentPage = 1;
      }
    },
    prevPage: (state, { payload }) => {
      if (state.firstPage > 0) {
        state.firstPage -= 10;
        state.lastPage -= 10;
        state.currentPage = payload - 1;
      } else {
        state.firstPage = 110;
        state.lastPage = 120;
        state.currentPage = 12;
      }
    },
    clickNumberPage: (state, { payload }) => {
      state.currentPage = payload;
      state.firstPage = (payload - 1) * 10;
      state.lastPage = payload * 10;
    },
    changeType: (state, { payload }) => {
      state.types = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allSurat = action.payload.data;
      })
      .addCase(getSurat.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOneSurat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneSurat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.openSurat = action.payload.data;
      })
      .addCase(getOneSurat.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTafsir.pending, (state) => {})
      .addCase(getTafsir.fulfilled, (state, { payload }) => {
        state.tafsir = payload.data;
      })
      .addCase(getTafsir.rejected, (state) => {
        throw new Error('Somthing went wrong');
      });
  },
});

export const { handleSearchSurat, searchSurat, changeQari, changeQariOnPlay, changeType, setActiveQuran, setMusicBar, pauseAudio, playAudio, nextPage, prevPage, clickNumberPage, setIsLoading } = suratSlice.actions;
export default suratSlice.reducer;
