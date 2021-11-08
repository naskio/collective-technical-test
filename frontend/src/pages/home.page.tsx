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


const getCryptosBySearchQuery = async (onSuccess: (cryptos: Crypto[]) => void, onError: (err: any, showSnackbar: boolean) => void, query?: string): Promise<Crypto[]> => {
    try {
        const cryptos: Crypto[] = await CryptosService.getBySearchQuery(query);
        onSuccess(cryptos);
        return cryptos;
    } catch (err) {
        onError(err, !!query);
        return [];
    }
}

const debouncedGetCryptosBySearchQuery = debounce(getCryptosBySearchQuery, 500);

export default function App() {
    const [search, setSearch] = useState<string>('');
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [variations, setVariations] = useState<object>({});
    const firstUpdate = useRef<boolean>(true);
    const {enqueueSnackbar} = useSnackbar();

    // error handler
    const errorHandler = useCallback(
        (err: any, showSnackbar: boolean) => {
            let message;
            if (err?.message) {
                message = err.message;
            } else {
                message = "Network Error: Check server is running";
            }
            // show snackbar
            if (firstUpdate.current || showSnackbar) {
                enqueueSnackbar(message, {
                    variant: 'error',
                });
            }
        },
        [enqueueSnackbar],
    );
    // success handler
    const successHandler = useCallback(
        (cryptos: Crypto[]) => {
            setCryptos(oldCryptos => {
                const oldPrices = oldCryptos.reduce((acc: any, curr: Crypto) => {
                    acc[curr.id] = curr.priceUsd;
                    return acc;
                }, {});
                const newVariations: any = {}
                cryptos.forEach(crypto => {
                    const oldPrice = oldPrices[crypto.id];
                    if (oldPrice) {
                        const diff = crypto.priceUsd - oldPrice;
                        if (diff > 0.0001) {
                            newVariations[crypto.id] = 'increasing';
                        } else if (diff < -0.0001) {
                            newVariations[crypto.id] = 'decreasing';
                        }
                    }
                });
                setVariations(newVariations);
                setTimeout(() => {
                    setVariations({});
                }, 1000);
                return cryptos;
            });
        },
        [],
    );


    // get data on mount
    useEffect(() => {
        getCryptosBySearchQuery(successHandler, errorHandler).finally(() => {
            firstUpdate.current = false;
        });
    }, [errorHandler, successHandler]);

    // fetch data on search
    useEffect(() => {
        if (!firstUpdate.current) {
            debouncedGetCryptosBySearchQuery(successHandler, errorHandler, search);
        }
    }, [search, errorHandler, successHandler]);

    // get live data every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            void getCryptosBySearchQuery(successHandler, errorHandler, search);
        }, 5000);
        return () => clearInterval(interval);
    }, [search, errorHandler, successHandler]);

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
                <CryptosTable cryptos={cryptos} variations={variations}/>
            </Box>
        </Container>
    )
};
