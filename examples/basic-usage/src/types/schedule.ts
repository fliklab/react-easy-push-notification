export interface Schedule {
  id: string;
  title: string;
  message: string;
  scheduledTime: string;
  notificationId?: number;
}

export interface ScheduleState {
  items: Schedule[];
  loading: boolean;
  error: string | null;
}

export interface CreateSchedulePayload {
  title: string;
  message: string;
  scheduledTime: string;
}

export interface UpdateSchedulePayload {
  id: string;
  title?: string;
  message?: string;
  scheduledTime?: string;
}
