import * as React from 'react';
import {useEffect, useState, useRef, useCallback} from "react";
import {
    Container,
    Box,
    TextField,
    InputAdornment,
} from '@mui/material';
import {useSnackbar} from 'notistack';
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
    const firstUpdate = useRef(true);
    const {enqueueSnackbar} = useSnackbar();

    // error handler
    const errorHandler = useCallback(
        (err: any) => {
            let message;
            if (err?.message) {
                message = err.message;
            } else {
                message = "Network Error: Check server is running";
            }
            // show snackbar
            if (firstUpdate.current) {
                enqueueSnackbar(message, {
                    variant: 'error',
                });
            }
        },
        [enqueueSnackbar],
    );


    // get data on mount
    useEffect(() => {
        getCryptosBySearchQuery(setCryptos, errorHandler).finally(() => {
            firstUpdate.current = false;
        });
    }, [errorHandler]);

    // fetch data on search
    useEffect(() => {
        if (!firstUpdate.current) {
            debouncedGetCryptosBySearchQuery(setCryptos, errorHandler, search);
        }
    }, [search, errorHandler]);

    // get live data every 12 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            void getCryptosBySearchQuery(setCryptos, errorHandler, search);
        }, 12000);
        return () => clearInterval(interval);
    }, [search, errorHandler]);

    return (
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
    )
};
