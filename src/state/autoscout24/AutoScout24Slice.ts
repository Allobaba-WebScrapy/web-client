import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface
interface AutoScout24State {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]; 
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AutoScout24State = {
  url: 'https://www.autoscout24.com/lst/?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=D&atype=C&',
  data: [],
  loading: false,
  error: null,
};

// Async thunk for fetching data
export const fetchData = createAsyncThunk('autoscout24/fetchData', async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data; // Modify this based on the shape of your fetched data
  } catch (error) {
    throw 'An error occurred while fetching data.';
  }
});

// Create slice
const autoscout24Slice = createSlice({
  name: 'autoscout24',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const { setUrl } = autoscout24Slice.actions;

export default autoscout24Slice.reducer;
