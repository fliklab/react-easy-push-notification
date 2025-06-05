import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Schedule,
  ScheduleState,
  CreateSchedulePayload,
  UpdateSchedulePayload,
} from "@/types/schedule";
import { v4 as uuidv4 } from "uuid";

const initialState: ScheduleState = {
  items: [],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<CreateSchedulePayload>) => {
      const newSchedule: Schedule = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.push(newSchedule);
    },
    updateSchedule: (state, action: PayloadAction<UpdateSchedulePayload>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteSchedule: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addSchedule,
  updateSchedule,
  deleteSchedule,
  setLoading,
  setError,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
