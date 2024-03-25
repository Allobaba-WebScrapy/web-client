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

interface CardInfo {
  title: string;
  activite: string;
  address: string;
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
  cards: [
    // {
    //   selected: false,
    //   card_id: "552",
    //   card_url: "545",
    //   info: {
    //     title: "565",
    //     activite: "35",
    //     address: "233",
    //     phones:  ["123", "456"],
    //   },
    // },
  ],
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
        if (state.progress[i].progress.includes("Scraping Page")) {
          // Update the cardsNumbers property
          state.progress[i].cardsNumbers += 1;
          break;
        }
      }
    },
    clearProgress: (state) => {
      state.progress = [];
    },
    setCardNumbers: (state) => {
      state.cardsNumbers += 1;
    },
    clearCardNumbers: (state) => {
      state.cardsNumbers = 0;
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
    removeSelectedCards: (state) => {
      state.cards = state.cards.filter((card) => !card.selected);
    },
    sortCards: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "title":
          state.cards = state.cards.sort((a, b) =>
            a.info.title.localeCompare(b.info.title)
          );
          break;
        case "activite":
          state.cards = state.cards.sort((a, b) =>
            a.info.activite.localeCompare(b.info.activite)
          );
          break;
        case "address":
          state.cards = state.cards.sort((a, b) =>
            a.info.address.localeCompare(b.info.address)
          );
          break;
        case "numbers":
          state.cards = state.cards.sort((a, b) =>
            a.info.phones[0].localeCompare(b.info.phones[0])
          );
          break;
      }
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
  setCardNumbers,
  clearCardNumbers,
  updateProgressCardNumbersForEachPage,
  setLoading,
  addUniqueObject,
  findDublicateNumbers,
  sortCards,
} = pagesJaunes.actions;

export default pagesJaunes.reducer;
