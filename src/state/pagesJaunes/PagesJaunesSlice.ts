import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface RequestUrlState {
//   url: string;
//   params: {
//     page: number;
//     tri: string;
//   };
//   limit: number;
//   businessType: string;
// }

interface RequestDataState {
  url: string;
  startPage: number;
  endPage: number;
  businessType: string;
}

interface Address {
  link: string;
  text: string;
}

interface CardInfo {
  title: string;
  activite: string;
  address: Address;
  phones: string[] | string;
}

export interface CardType {
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
  progress: any;
  cardsNumbers: number;
  loading: boolean;
  error: { type: string; message: string } | null;
  uniqueObjects: string[];
  dublicateNumbers: string[];
  oldRequests: string[];
}

// Initial state
const initialState: PagesJaunesState = {
  requestData: {
    url: "",
    startPage: 1,
    endPage: 1,
    businessType: "ALL",
  },
  cards: [],
  progress: [],
  cardsNumbers: 0,
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
    addCard: (state, action: PayloadAction<CardType>) => {
      state.cards = [...state.cards, action.payload];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProgress: (state, action: PayloadAction<any>) => {
      state.progress.push(action.payload);
    },
    updateProgressCardNumbersForEachPage: (state) => {
      // Find the last object with "Scraping url" in progress
      for (let i = state.progress.length - 1; i >= 0; i--) {
        if (state.progress[i].message.includes("Scraping Page")) {
          // Update the cardsNumbers property
          state.progress[i].limiCard.scrapedCardsNumbers += 1;
          break;
        }
      }
    },
    clearProgress: (state) => {
      state.progress = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (
      state,
      action: PayloadAction<{ type: string; message: string } | null>
    ) => {
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
        if (typeof card.info.phones == typeof []) {
          for (const number of card.info.phones) {
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
    },
    updateCardSelectedState: (
      state,
      action: PayloadAction<{ index: number; value: boolean }>
    ) => {
      console.log("select update", action.payload.index, action.payload.value);
      state.cards[action.payload.index].selected = action.payload.value;
    },
    removeSelectedCards: (state, action: PayloadAction<string[]>) => {
      state.cards = state.cards.filter(
        (card) => !action.payload.includes(JSON.stringify(card))
      );
    },
  },
});

export const {
  setRequestData,
  removeSelectedCards,
  updateCardSelectedState,
  addCard,
  setError,
  addOldRequest,
  setProgress,
  clearProgress,
  updateProgressCardNumbersForEachPage,
  setLoading,
  addUniqueObject,
  findDublicateNumbers,
} = pagesJaunes.actions;

export default pagesJaunes.reducer;
