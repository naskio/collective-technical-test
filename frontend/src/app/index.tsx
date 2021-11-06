import Home from '../pages/home.page';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../theme";
import React from "react";

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Home/>
    </ThemeProvider>
);

export default App;
