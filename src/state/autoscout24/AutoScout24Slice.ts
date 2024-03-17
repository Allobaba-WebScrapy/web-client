import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

interface RequestDataState {
  url: string;
  startPage: number;
  offers: number;
  waitingTime: number;
}

interface ProductType {
  url:string,
  data:{
    title: string;
    model: string;
  vendor_info: {
      name: string;
      numbers: string[] | string;
      address: {
        url: string;
        text: string;
      },
      pro: boolean;
      company: string;
  }}
}


// Interface
interface AutoScout24State {
  requestData: RequestDataState;
  cars: ProductType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
  loading: boolean;
  error: string | null;
  uniqueObjects: Set<string>;
  dublicateNumbers: string[];
  oldRequests :  string[];
}

// Initial state
const initialState: AutoScout24State = {
  requestData: {'url':"",'startPage':1,'offers':1,'waitingTime':10},
  cars: [],
  info: {},
  loading: false,
  error: null,
  uniqueObjects: new Set<string>(),
  dublicateNumbers: [],
  oldRequests: []
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
    addCar: (state, action: PayloadAction<ProductType>) => {
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
    addUniqueObject: (state, action: PayloadAction<string>) => {
      state.uniqueObjects.add(action.payload);
    },
    addOldRequest: (state) => {
      state.oldRequests.push(JSON.stringify(state.requestData));
    }
    ,
    findDublicateNumbers: (state) => {
        const allNumbers: string[] = [];
        
        const seenNumbers = new Set<string>();
    
        for (const car of state.cars) {
            for (const number of car.data.vendor_info.numbers) {
                if (seenNumbers.has(number)) {
                    if (!state.dublicateNumbers.includes(number)) {
                      state.dublicateNumbers.push(number);
                    }
                } else {
                    seenNumbers.add(number);
                    allNumbers.push(number);
                }
            }
        }
    
    }
  }
});

export const { setRequestData,addCar,setError,addOldRequest,setInfo,setLoading,addUniqueObject,findDublicateNumbers } = autoscout24Slice.actions;

export default autoscout24Slice.reducer;
