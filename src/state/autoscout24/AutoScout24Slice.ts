import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequestDataState {
  url: string;
  startPage: number;
  offers: number;
  waitingTime: number;
}

// Interface
interface AutoScout24State {
  requestData: RequestDataState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cars: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AutoScout24State = {
  requestData: {'url':"",'startPage':1,'offers':1,'waitingTime':10},
  cars: [],
  info: {},
  loading: false,
  error: null,
};

// Create slice
const autoscout24Slice = createSlice({
  name: 'autoscout24',
  initialState,
  reducers: {
    setRequestData: (state, action: PayloadAction<RequestDataState>) => {
      state.requestData = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addCar: (state, action: PayloadAction<any>) => {
      state.cars = [...state.cars,action.payload];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setInfo: (state, action: PayloadAction<any>) => {
      state.info = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  }
});

export const { setRequestData,addCar,setError,setInfo,setLoading } = autoscout24Slice.actions;

export default autoscout24Slice.reducer;
