import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '../store';
import { toast } from '@/components/ui/use-toast';



interface RequestDataState {
  url: string;
  businessType: string;
  startPage: number;
  offers: number;
  waitingTime: number;
}

interface ProductType {
  selected: boolean;
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

interface infoState {
  num_of_pages:number;
  num_of_offers:number;
  start_from_page: number;
  end_in_page: number;
  pages_url:string[];
  offers_got:number; 
  errors_list:string[];
  offers_user_want:number;
}

// Interface
interface AutoScout24State {
  requestData: RequestDataState;
  cars: ProductType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: infoState;
  loading: boolean;
  error: string | null;
  uniqueObjects: string[];
  dublicateNumbers: string[];
  oldRequests :  string[];
  requestState: string;
  sumProductRequested: number;
  productsNumBeforeLastRequest: number;
}

// Initial state
const initialState: AutoScout24State = {
  requestData: {'url':"",'startPage':1,'offers':1,'waitingTime':10,'businessType':'all'},
  cars: [],
  info: { num_of_pages:0,num_of_offers:0,start_from_page:0,end_in_page:0,pages_url:[],offers_got:0,errors_list:[],offers_user_want:0},
  loading: false,
  error: null,
  uniqueObjects: [],
  dublicateNumbers: [],
  oldRequests: [],
  requestState:'sending request',
  sumProductRequested: 0,
  productsNumBeforeLastRequest:0,
};

// Create slice
const autoscout24Slice = createSlice({
  name: 'autoscout24',
  initialState,
  reducers: {
    setRequestData: (state, action: PayloadAction<RequestDataState>) => {
      state.requestData = action.payload;
      state.productsNumBeforeLastRequest = state.cars.length;
      state.sumProductRequested = state.cars.length + action.payload.offers;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addCar: (state, action: PayloadAction<ProductType>) => {
      state.cars = [...state.cars,action.payload];
    },
    setRequestState: (state, action: PayloadAction<string>) => {
      state.requestState = action.payload;
    }
    ,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setInfo: (state, action: PayloadAction<infoState>) => {
      state.info = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addUniqueObject: (state, action: PayloadAction<string>) => {
      state.uniqueObjects.push(action.payload);
    },
    addOldRequest: (state) => {
      state.oldRequests.push(JSON.stringify(state.requestData));
    }
    ,
    findDublicateNumbers: (state) => {
        const allNumbers: string[] = [];
        state.dublicateNumbers = []
        for (const car of state.cars) {
          if (typeof car.data.vendor_info.numbers == typeof []) {
            for (const number of car.data.vendor_info.numbers) {
                if (allNumbers.includes(number)) {
                  if (!state.dublicateNumbers.includes(number)) {
                    state.dublicateNumbers.push(number);
                  }
                }else{
                  allNumbers.push(number);
                }
            }
          }
        }
    
    },
    updateProductSelectedState: (state, action: PayloadAction<{index:number,value:boolean}>) => {
      state.cars[action.payload.index].selected = action.payload.value;
    },
    removeSelectedProducts: (state) => {
      state.cars = state.cars.filter((car) => !car.selected); 
    },
    sortProducts: (state,action:PayloadAction<string>) => {
      switch (action.payload) {
        case 'title':
          state.cars = state.cars.sort((a, b) => a.data.title.localeCompare(b.data.title));
          break;
        case 'model':
          state.cars = state.cars.sort((a, b) => a.data.model.localeCompare(b.data.model));
          break;
        case 'vendor':
          state.cars = state.cars.sort((a, b) => a.data.vendor_info.name.localeCompare(b.data.vendor_info.name));
          break;
        case 'company':
          state.cars = state.cars.sort((a, b) => a.data.vendor_info.company.localeCompare(b.data.vendor_info.company));
          break;
        case 'numbers':
          state.cars = state.cars.sort((a, b) => a.data.vendor_info.numbers[0].localeCompare(b.data.vendor_info.numbers[0]));
          break;
        case 'address':
          state.cars = state.cars.sort((a, b) => a.data.vendor_info.address.text.localeCompare(b.data.vendor_info.address.text));
          break;
        case 'pro':
          state.cars = state.cars.sort((a, b) => a.data.vendor_info.pro.toString().localeCompare(b.data.vendor_info.pro.toString()));
          break;
        default:
          break;
      }
    }
  }
  });


export const scrapData = createAsyncThunk(
  'users/scrapData',
  async () => {
    try {
      store.dispatch(setLoading(true));
      const requestData = store.getState().autoscout24.requestData; 
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: requestData.url,
          startPage: requestData.startPage,
          offersNumber: requestData.offers,
          waitingTime: requestData.waitingTime,
          businessType: requestData.businessType,
        }),
      };
      const response = await fetch(
        "https://clownfish-app-uy5m7.ondigitalocean.app/scrape",
        requestOptions
      );
      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          store.dispatch(setLoading(false));
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        const obj = JSON.parse(decodedChunk);
        console.log("--- PRODUCT:",obj);
        if (obj.url !== undefined) {
          if (!store.getState().autoscout24.uniqueObjects.includes(decodedChunk)) {
            store.dispatch(addUniqueObject(decodedChunk));
            obj["selected"] = false;
            store.dispatch(addCar(obj));
          } else {
            toast({
              variant: "destructive",
              title: "Product is already in the table.",
              description: "The duplicate version doesn't added to table!",
            });
            console.log("duplicated");
          }
        } else if (obj.error) {
          store.dispatch(setError(obj.error));
          toast({
            variant: "destructive",
            title: "Request blocked.",
            description: obj.error,
          });
          console.log(obj.error);
          setLoading(false);
        } else if (obj.type === "result_info") {
          store.dispatch(setInfo(obj.data));
        } else if (obj.type === "progress") {
          store.dispatch(setRequestState(obj.data.message));
        }
      }
    } catch (error) {
      console.log(error);
      store.dispatch(setLoading(false));
      // add later the other errors
    }
  },
)



export const { setRequestData,setRequestState,sortProducts,removeSelectedProducts,updateProductSelectedState,addCar,setError,addOldRequest,setInfo,setLoading,addUniqueObject,findDublicateNumbers } = autoscout24Slice.actions;

export default autoscout24Slice.reducer;
