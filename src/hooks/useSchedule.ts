import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "@/store/scheduleSlice";
import { CreateSchedulePayload, UpdateSchedulePayload } from "@/types/schedule";
import {
  scheduleNotification,
  cancelScheduledNotification,
} from "@/utils/pushNotification";

export const useSchedule = () => {
  const dispatch = useDispatch();
  const schedules = useSelector((state: RootState) => state.schedule.items);
  const loading = useSelector((state: RootState) => state.schedule.loading);
  const error = useSelector((state: RootState) => state.schedule.error);

  const createSchedule = useCallback(
    (payload: CreateSchedulePayload) => {
      dispatch(addSchedule(payload));
      const scheduledTime = new Date(payload.scheduledAt);
      scheduleNotification(payload.title, scheduledTime, {
        body: payload.content,
      });
    },
    [dispatch]
  );

  const modifySchedule = useCallback(
    (payload: UpdateSchedulePayload) => {
      dispatch(updateSchedule(payload));
      if (payload.scheduledAt) {
        const scheduledTime = new Date(payload.scheduledAt);
        scheduleNotification(payload.title || "", scheduledTime, {
          body: payload.content,
        });
      }
    },
    [dispatch]
  );

  const removeSchedule = useCallback(
    (id: string) => {
      dispatch(deleteSchedule(id));
    },
    [dispatch]
  );

  return {
    schedules,
    loading,
    error,
    createSchedule,
    modifySchedule,
    removeSchedule,
  };
};
