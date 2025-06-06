import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addSchedule,
  updateSchedule,
  removeSchedule,
  setNotificationId,
} from "../store/scheduleSlice";
import {
  CreateSchedulePayload,
  UpdateSchedulePayload,
  Schedule,
} from "../types/schedule";
import {
  scheduleNotification,
  cancelScheduledNotification,
} from "../../src/utils/notification";

export const useSchedule = () => {
  const dispatch = useDispatch();
  const schedules = useSelector((state: RootState) => state.schedule.items);

  const createSchedule = useCallback(
    async (payload: CreateSchedulePayload) => {
      dispatch(addSchedule(payload));
      const notificationId = scheduleNotification(
        payload.title,
        new Date(payload.scheduledTime),
        { body: payload.message }
      );
      dispatch(
        setNotificationId({
          id: schedules[schedules.length - 1].id,
          notificationId,
        })
      );
    },
    [dispatch, schedules]
  );

  const editSchedule = useCallback(
    (payload: UpdateSchedulePayload) => {
      const schedule = schedules.find((s: Schedule) => s.id === payload.id);
      if (!schedule) return;

      if (schedule.notificationId) {
        cancelScheduledNotification(schedule.notificationId);
      }

      dispatch(updateSchedule(payload));

      // 알림 관련 필드가 변경된 경우에만 새로운 알림 스케줄링
      if (payload.scheduledTime || payload.title || payload.message) {
        const updatedSchedule = {
          ...schedule,
          ...payload,
        } as Schedule;

        const notificationId = scheduleNotification(
          updatedSchedule.title,
          new Date(updatedSchedule.scheduledTime),
          { body: updatedSchedule.message }
        );
        dispatch(setNotificationId({ id: payload.id, notificationId }));
      }
    },
    [dispatch, schedules]
  );

  const deleteSchedule = useCallback(
    (id: string) => {
      const schedule = schedules.find((s: Schedule) => s.id === id);
      if (schedule?.notificationId) {
        cancelScheduledNotification(schedule.notificationId);
      }
      dispatch(removeSchedule(id));
    },
    [dispatch, schedules]
  );

  return {
    schedules,
    createSchedule,
    editSchedule,
    deleteSchedule,
  };
};
