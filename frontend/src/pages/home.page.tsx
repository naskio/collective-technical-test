import * as React from 'react';
import {useEffect, useState, useRef} from "react";
import {
    Container,
    Box,
    TextField, InputAdornment, Snackbar, Alert,
} from '@mui/material';
import {SearchOutlined as SearchIcon} from '@mui/icons-material';
import CryptosTable from "../components/cryptos.table";
import CryptosService from '../services/cryptos.service';
import Crypto from "../types/crypto.type";
import debounce from 'lodash/debounce';


const getCryptosBySearchQuery = async (onSuccess: (cryptos: Crypto[]) => void, onError: (err: any) => void, query?: string): Promise<Crypto[]> => {
    try {
        const cryptos: Crypto[] = await CryptosService.getBySearchQuery(query);
        onSuccess(cryptos);
        return cryptos;
    } catch (err) {
        onError(err);
        return [];
    }
}

const debouncedGetCryptosBySearchQuery = debounce(getCryptosBySearchQuery, 500);

export default function App() {
    const [search, setSearch] = useState<string>('');
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [errMessage, setErrMessage] = React.useState<string>("");
    const firstUpdate = useRef(true);
    // snackbar close handler
    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    // error handler
    const errorHandler = (err: any) => {
        if (err?.message) {
            setErrMessage(err.message);
        } else {
            setErrMessage("Network Error: Check server is running");
        }
        setOpenSnackbar(true);
    }

    // get data on mount
    useEffect(() => {
        getCryptosBySearchQuery(setCryptos, errorHandler).finally(() => {
            firstUpdate.current = false;
        });
    }, []);

    // fetch data on search
    useEffect(() => {
        if (!firstUpdate.current) {
            debouncedGetCryptosBySearchQuery(setCryptos, errorHandler, search);
        }
    }, [search]);

    // get live data every 12 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            void getCryptosBySearchQuery(setCryptos, errorHandler, search);
        }, 12000);
        return () => clearInterval(interval);
    }, [search]);

    return (
        <>
            <Container maxWidth={"xl"}>
                <Box my={4}>
                    <TextField
                        margin="normal"
                        fullWidth
                        type="search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Search"
                        label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                <Box my={4}>
                    <CryptosTable cryptos={cryptos}/>
                </Box>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={3000}
                      onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errMessage}
                </Alert>
            </Snackbar>
        </>
    )
};
