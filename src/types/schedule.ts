export interface Schedule {
  id: string;
  title: string;
  content: string;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleState {
  items: Schedule[];
  loading: boolean;
  error: string | null;
}

export interface CreateSchedulePayload {
  title: string;
  content: string;
  scheduledAt: string;
}

export interface UpdateSchedulePayload extends Partial<CreateSchedulePayload> {
  id: string;
}
