import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./store";
import { theme } from "./theme";
import { usePushNotification } from "react-easy-push";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { ScheduleForm } from "./components/ScheduleForm";
import { ScheduleList } from "./components/ScheduleList";

function App() {
  const { subscribe, unsubscribe, isSubscribed, error } = usePushNotification();

  return (
    <Box sx={{ padding: "20px" }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h4" gutterBottom>
            React Easy Push Demo
          </Typography>

          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="body1">
              구독 상태: {isSubscribed ? "구독 중" : "미구독"}
            </Typography>
            {error && (
              <Typography color="error" variant="body2">
                에러: {error}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={subscribe}
              disabled={isSubscribed}
            >
              푸시 알림 구독하기
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={unsubscribe}
              disabled={!isSubscribed}
            >
              구독 취소하기
            </Button>
          </Box>
        </Paper>

        {isSubscribed && (
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              알림 스케줄 관리
            </Typography>
            <ScheduleForm />
            <ScheduleList />
          </Paper>
        )}
      </Container>
    </Box>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
