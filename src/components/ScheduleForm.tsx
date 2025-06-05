import { useState, FormEvent } from "react";
import { Paper, TextField, Button, Stack, Typography } from "@mui/material";
import { useSchedule } from "@/hooks/useSchedule";
import { CreateSchedulePayload } from "@/types/schedule";

export const ScheduleForm = () => {
  const { createSchedule } = useSchedule();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const schedule: CreateSchedulePayload = {
      title,
      content,
      scheduledAt: new Date(scheduledAt).toISOString(),
    };

    createSchedule(schedule);
    setTitle("");
    setContent("");
    setScheduledAt("");
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        새 스케줄 추가
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={3}
            required
            fullWidth
          />
          <TextField
            label="예정 시간"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            추가
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
