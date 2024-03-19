import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestDataState {
  url: string;
  startPage: number;
  sortOption: string;
  limit: number;
  businessType: string;
}

interface CardInfo {
  title: string;
  activite: string;
  adress: string;
  phone: string[];
}

interface CardType {
  selected: boolean;
  card_id: string;
  card_url: string;
  info: CardInfo;
}

// Interface
interface PagesJaunesState {
  requestData: RequestDataState;
  cards: CardType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
  loading: boolean;
  error: string | null;
  uniqueObjects: string[];
  dublicateNumbers: string[];
  oldRequests: string[];
}

// Initial state
const initialState: PagesJaunesState = {
  requestData: {
    url: "",
    startPage: 1,
    sortOption: "PERTINENCE-ASC",
    limit: 1,
    businessType: "all",
  },
  cards: [],
  info: {},
  loading: false,
  error: null,
  uniqueObjects: [],
  dublicateNumbers: [],
  oldRequests: [],
};

// Create slice
const pagesJaunes = createSlice({
  name: "pagesJaunes",
  initialState,
  reducers: {
    setRequestData: (state, action: PayloadAction<RequestDataState>) => {
      state.requestData = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addCar: (state, action: PayloadAction<CardType>) => {
      state.cards = [...state.cards, action.payload];
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
      state.uniqueObjects.push(action.payload);
    },
    addOldRequest: (state) => {
      state.oldRequests.push(JSON.stringify(state.requestData));
    },
    findDublicateNumbers: (state) => {
      const allNumbers: string[] = [];

      for (const card of state.cards) {
        if (typeof card.info.phone == typeof []) {
          for (const number of card.info.phone) {
            if (allNumbers.includes(number)) {
              if (!state.dublicateNumbers.includes(number)) {
                state.dublicateNumbers.push(number);
              }
            } else {
              allNumbers.push(number);
            }
          }
        }
      }
      console.log(allNumbers);
    },
    updateProductSelectedState: (
      state,
      action: PayloadAction<{ index: number; value: boolean }>
    ) => {
      console.log("select update", action.payload.index, action.payload.value);
      state.cards[action.payload.index].selected = action.payload.value;
    },
    removeSelectedProducts: (state) => {
      state.cards = state.cards.filter((card) => !card.selected);
    },
  },
});

export const {
  setRequestData,
  removeSelectedProducts,
  updateProductSelectedState,
  addCar,
  setError,
  addOldRequest,
  setInfo,
  setLoading,
  addUniqueObject,
  findDublicateNumbers,
} = pagesJaunes.actions;

export default pagesJaunes.reducer;
