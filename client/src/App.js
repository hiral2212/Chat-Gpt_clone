import "./App.css";
import { Routes, Route } from "react-router-dom";

import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import { themeSettings } from "./theme";
import Navbar from "./component/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Summary from "./pages/Summary";
import Paragraph from "./pages/Paragraph";
import ChatBot from "./pages/ChatBot";
import JsConverter from "./pages/JsConverter";
import ScifiImage from "./pages/ScifiImage";
import Speeach from "./pages/Speeach";
function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/summary" element={<Summary />}></Route>
          <Route path="/paragraph" element={<Paragraph />}></Route>
          <Route path="/chatbot" element={<ChatBot />}></Route>
          <Route path="/js-converter" element={<JsConverter />} />
          <Route path="/scifi-image" element={<ScifiImage />} />
          <Route path="/Speeach" element={<Speeach />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
