import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSchedule } from "../hooks/useSchedule";
import { CreateSchedulePayload } from "../types/schedule";

export const ScheduleForm: React.FC = () => {
  const { createSchedule } = useSchedule();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message || !scheduledTime) return;

    const payload: CreateSchedulePayload = {
      title,
      message,
      scheduledTime: new Date(scheduledTime).toISOString(),
    };

    await createSchedule(payload);
    setTitle("");
    setMessage("");
    setScheduledTime("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        새 알림 추가
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          label="예약 시간"
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!title || !message || !scheduledTime}
        >
          알림 예약
        </Button>
      </Box>
    </Box>
  );
};
