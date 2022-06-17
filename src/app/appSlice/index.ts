import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TRL = { id: string; name: string; description?: string };
type Product = {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: { id: number; name: string };
  categories: { id: number; name: string }[];
  investmentEffort: string;
  implementationEffortText?: string;
  trl: TRL;
  user: Record<string, any>;
  company: Record<string, any>;
  businessModels: { id: number; name: string }[];
};

export type State = {
  product: Product | undefined;
  trl: TRL[];
  config:
    | {
        id: string;
        logo: string;
        mainColor: string;
        hasUserSection: boolean;
      }
    | undefined;
};

const initialState: State = {
  product: undefined,
  trl: [],
  config: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SET_TRL: (state, action: PayloadAction<TRL[]>) => {
      state.trl = action.payload;
    },
    SET_CONFIG: (state, action: PayloadAction<State["config"]>) => {
      state.config = action.payload;
    },
    SET_PRODUCTS: (state, action: PayloadAction<State["product"]>) => {
      state.product = action.payload;
    },
  },
});

export const { SET_TRL, SET_CONFIG, SET_PRODUCTS } = appSlice.actions;

export default appSlice.reducer;
