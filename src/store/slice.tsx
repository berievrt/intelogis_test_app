import { createSlice } from "@reduxjs/toolkit";

import type { Claim, Marker } from "../../types/common";

export interface State {
  requests: Claim[];
  markers: Marker[];
  activeRoute: {
    id?: string;
    from?: {
      long: number;
      lat: number;
    };
    to?: {
      long: number;
      lat: number;
    };
  };
}

const initialState: State = {
  requests: [],
  markers: [],
  activeRoute: {},
};

export const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getRequests: () => {},
    getMarkers: () => {},
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    updateRequests: (state, action) => {
      state.requests = [
        ...state.requests.map((item) => item.id === action.payload.id ? action.payload : item),
      ];
    },
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
    setActiveRoute: (state, action) => {
      state.activeRoute = { ...state.activeRoute, ...action.payload };
    },
  },
});

export const {
  setRequests,
  getRequests,
  getMarkers,
  setMarkers,
  setActiveRoute,
  updateRequests
} = MainSlice.actions;

export type RootState = {
  main: State;
};

export default MainSlice.reducer;
