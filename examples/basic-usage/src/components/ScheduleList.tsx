import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useSchedule } from "../hooks/useSchedule";
import { Schedule } from "../types/schedule";

export const ScheduleList: React.FC = () => {
  const { schedules, deleteSchedule } = useSchedule();

  if (schedules.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        예약된 알림이 없습니다.
      </Typography>
    );
  }

  return (
    <List>
      {schedules.map((schedule: Schedule) => (
        <ListItem
          key={schedule.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteSchedule(schedule.id)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={schedule.title}
            secondary={
              <Box component="span" sx={{ display: "block" }}>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {schedule.message}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  {format(new Date(schedule.scheduledTime), "PPPp", {
                    locale: ko,
                  })}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
