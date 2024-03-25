import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RequestDataState {
  activites_name: string;
  type: string;
  start_pages: number;
  limit_pages: number;
}

export interface CardType {
  selected: boolean;
  title: string;
  category: string;
  adress: string;
  phone: string[] | string;
  email: string;
}

// Interface
interface OrangeState {
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
const initialState: OrangeState = {
  requestData: {
    activites_name: "",
    type: "",
    start_pages: 1,
    limit_pages: 1,
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
const orange = createSlice({
  name: "orange",
  initialState,
  reducers: {
    setRequestData: (state, action: PayloadAction<RequestDataState>) => {
      state.requestData = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addCard: (state, action: PayloadAction<CardType>) => {
      console.log("Received: ", action.payload);
      state.cards = [...state.cards, action.payload];
      console.log(state.cards);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProgress: (state, action: PayloadAction<any>) => {
      state.progress.push(action.payload);
    },
    updateProgressCardNumbersForEachPage: (state) => {
      // Find the last object with "Scraping url" in progress
      for (let i = state.progress.length - 1; i >= 0; i--) {
        if (state.progress[i].message.includes("Scrape Card")) {
          // Update the cardsNumbers property
          state.cardsNumbers = state.progress[i].procsess;
          break;
        }
      }
    },
    clearProgress: (state) => {
      state.progress = [];
    },
    setCardNumbers: (state) => {
      state.cardsNumbers = state.progress[-1].procsess;
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
        if (typeof card.phone == typeof []) {
          for (const number of card.phone) {
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
            a.title.localeCompare(b.title)
          );
          break;
        case "activite":
          state.cards = state.cards.sort((a, b) =>
            a.category.localeCompare(b.category)
          );
          break;
        case "address":
          state.cards = state.cards.sort((a, b) =>
            a.adress.localeCompare(b.adress)
          );
          break;
        case "numbers":
          state.cards = state.cards.sort((a, b) =>
            a.phone[0].localeCompare(b.phone[0])
          );
          break;
        case "email":
          state.cards = state.cards.sort((a, b) =>
            a.email.localeCompare(b.email)
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
} = orange.actions;

export default orange.reducer;
