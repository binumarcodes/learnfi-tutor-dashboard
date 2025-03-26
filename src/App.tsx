import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./page/Dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif"
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
