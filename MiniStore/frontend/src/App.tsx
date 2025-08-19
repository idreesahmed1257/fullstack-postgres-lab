import { ThemeProvider } from "@emotion/react";
import "./App.css";
import MyRouter from "./components/Routes/MyRouter";
import theme from "./components/styles/theme";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyRouter />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
