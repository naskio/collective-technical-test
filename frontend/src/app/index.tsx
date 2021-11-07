import React, {useCallback, useRef} from "react";
import Home from '../pages/home.page';
import {CssBaseline, ThemeProvider, IconButton} from "@mui/material";
import {CloseOutlined as CloseIcon} from "@mui/icons-material";
import theme from "../theme";
import {SnackbarProvider} from 'notistack';


const App = () => {
    const notistackRef = useRef<any>(undefined);

    const onClickDismiss = useCallback((key: any) => () => {
        if (notistackRef.current) {
            notistackRef.current.closeSnackbar(key);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                ref={notistackRef}
                preventDuplicate
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={3000}
                maxSnack={3}
                action={(key) => (
                    <IconButton key="close" aria-label="close" color="inherit" onClick={onClickDismiss(key)}>
                        <CloseIcon/>
                    </IconButton>
                )}
            >
                <CssBaseline/>
                <Home/>
            </SnackbarProvider>
        </ThemeProvider>
    )
};

export default App;
