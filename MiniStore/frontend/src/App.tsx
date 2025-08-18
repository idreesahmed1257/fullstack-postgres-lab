import { ThemeProvider } from "@emotion/react";
import "./App.css";
import MyRouter from "./components/Routes/MyRouter";
import theme from "./components/styles/theme";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MyRouter />
            <Toaster />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
