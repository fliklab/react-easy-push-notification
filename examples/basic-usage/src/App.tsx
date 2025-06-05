import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "@/store";
import { theme } from "@/theme";
import { ScheduleList } from "@/components/ScheduleList";
import { ScheduleForm } from "@/components/ScheduleForm";
import { requestNotificationPermission } from "@/utils/pushNotification";

function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: "2rem" }}>
          <ScheduleForm />
          <ScheduleList />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
