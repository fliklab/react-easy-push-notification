import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSchedule } from "@/hooks/useSchedule";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const ScheduleList = () => {
  const { schedules, removeSchedule } = useSchedule();

  if (schedules.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          등록된 스케줄이 없습니다.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <List>
        {schedules.map((schedule) => (
          <ListItem
            key={schedule.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeSchedule(schedule.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={schedule.title}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {schedule.content}
                  </Typography>
                  <br />
                  {format(new Date(schedule.scheduledAt), "PPP p", {
                    locale: ko,
                  })}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
