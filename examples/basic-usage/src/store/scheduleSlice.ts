import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  Schedule,
  CreateSchedulePayload,
  UpdateSchedulePayload,
} from "../types/schedule";

interface ScheduleState {
  items: Schedule[];
}

const initialState: ScheduleState = {
  items: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<CreateSchedulePayload>) => {
      const newSchedule: Schedule = {
        id: uuidv4(),
        ...action.payload,
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
        };
      }
    },
    removeSchedule: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setNotificationId: (
      state,
      action: PayloadAction<{ id: string; notificationId: number }>
    ) => {
      const schedule = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (schedule) {
        schedule.notificationId = action.payload.notificationId;
      }
    },
  },
});

export const {
  addSchedule,
  updateSchedule,
  removeSchedule,
  setNotificationId,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
