import * as React from 'react';
import {
    Container,
    Box
} from '@mui/material';
import CryptosTable from "../components/cryptos.table";
import {useEffect, useState} from "react";
import CryptosService from '../services/cryptos.service';
import Crypto from "../types/crypto.type";


export default function App() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);

    useEffect(() => {
        CryptosService.getAll().then((res) => {
            setCryptos(res);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Container maxWidth={"xl"}>
            <Box mt={4} mb={4}>
                <CryptosTable cryptos={cryptos}/>
            </Box>
        </Container>
    )
};
