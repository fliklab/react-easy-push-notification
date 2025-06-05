import { useState, useMemo } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSchedule } from "@/hooks/useSchedule";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Schedule } from "@/types/schedule";

type SortOrder = "asc" | "desc";
type SortField = "title" | "scheduledAt";

const ITEMS_PER_PAGE = 5;

export const ScheduleList = () => {
  const { schedules, removeSchedule } = useSchedule();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortField, setSortField] = useState<SortField>("scheduledAt");
  const [page, setPage] = useState(1);

  const filteredAndSortedSchedules = useMemo(() => {
    return [...schedules]
      .filter(
        (schedule: Schedule) =>
          schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          schedule.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortField === "title") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else {
          const dateA = new Date(a.scheduledAt).getTime();
          const dateB = new Date(b.scheduledAt).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }
      });
  }, [schedules, searchTerm, sortOrder, sortField]);

  const paginatedSchedules = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedSchedules.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedSchedules, page]);

  const pageCount = Math.ceil(filteredAndSortedSchedules.length / ITEMS_PER_PAGE);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

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
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6" gutterBottom>
          스케줄 목록
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="검색"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="정렬 기준"
            size="small"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="scheduledAt">예정 시간</MenuItem>
            <MenuItem value="title">제목</MenuItem>
          </TextField>
          <TextField
            select
            label="정렬 순서"
            size="small"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="asc">오름차순</MenuItem>
            <MenuItem value="desc">내림차순</MenuItem>
          </TextField>
        </Stack>
        <List>
          {paginatedSchedules.map((schedule) => (
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
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ alignSelf: "center" }}
          />
        )}
      </Stack>
    </Paper>
  );
};
