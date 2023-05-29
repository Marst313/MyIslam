import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customFetchDoa } from '../utils/axios';

const initialState = {
  allDoas: [],
  doas: [],
  isLoading: false,
  search: '',
};
const doaThunk = async (surat, thunkAPI) => {
  try {
    const resp = await customFetchDoa.get();
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const getDoa = createAsyncThunk('doa', doaThunk);
export const doaSlice = createSlice({
  name: 'doa',
  initialState,
  reducers: {
    handleSearchDoa: (state, { payload }) => {
      state.search = payload;
    },
    searchDoa: (state, { payload }) => {
      state.doas = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoa.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allDoas = payload.data;
      })
      .addCase(getDoa.rejected, (state) => {
        state.isLoading = false;
        throw new Error('Somthing went wrong');
      });
  },
});

export const { handleSearchDoa, searchDoa } = doaSlice.actions;
export default doaSlice.reducer;
