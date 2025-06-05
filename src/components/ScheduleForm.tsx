import { useState, FormEvent, ChangeEvent } from "react";
import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { useSchedule } from "@/hooks/useSchedule";
import { CreateSchedulePayload } from "@/types/schedule";

interface FormErrors {
  title?: string;
  content?: string;
  scheduledAt?: string;
}

export const ScheduleForm = () => {
  const { createSchedule } = useSchedule();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "제목을 입력해주세요";
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = "내용을 입력해주세요";
      isValid = false;
    }

    if (!scheduledAt) {
      newErrors.scheduledAt = "예정 시간을 선택해주세요";
      isValid = false;
    } else {
      const selectedDate = new Date(scheduledAt);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.scheduledAt = "현재 시간 이후로 선택해주세요";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const schedule: CreateSchedulePayload = {
      title: title.trim(),
      content: content.trim(),
      scheduledAt: new Date(scheduledAt).toISOString(),
    };

    try {
      createSchedule(schedule);
      setTitle("");
      setContent("");
      setScheduledAt("");
      setShowSuccess(true);
    } catch (error) {
      console.error("스케줄 생성 중 오류 발생:", error);
      setErrors({
        ...errors,
        title: "스케줄 생성 중 오류가 발생했습니다",
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void
  ) => {
    setter(e.target.value);
    // 해당 필드의 에러 메시지 제거
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        새 스케줄 추가
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="title"
            label="제목"
            value={title}
            onChange={(e) => handleChange(e, setTitle)}
            error={!!errors.title}
            helperText={errors.title}
            required
            fullWidth
          />
          <TextField
            name="content"
            label="내용"
            value={content}
            onChange={(e) => handleChange(e, setContent)}
            error={!!errors.content}
            helperText={errors.content}
            multiline
            rows={3}
            required
            fullWidth
          />
          <TextField
            name="scheduledAt"
            label="예정 시간"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => handleChange(e, setScheduledAt)}
            error={!!errors.scheduledAt}
            helperText={errors.scheduledAt}
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
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          스케줄이 성공적으로 추가되었습니다
        </Alert>
      </Snackbar>
    </Paper>
  );
};
