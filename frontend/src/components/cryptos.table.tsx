import * as React from "react";
import {
    Avatar, Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {green, red} from "@mui/material/colors";
import {formatPrice} from "../utils/formatters";
import Crypto from "../types/crypto.type";

function CryptosTable({cryptos}: { cryptos: Crypto[] }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Rank</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Market Cap</TableCell>
                        <TableCell align="right">VWAP (24Hr)</TableCell>
                        <TableCell align="right">Supply</TableCell>
                        <TableCell align="right">Volume (24Hr)</TableCell>
                        <TableCell align="right">Change (24Hr)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cryptos.map(({
                                      changePercent24Hr,
                                      iconUrl,
                                      id,
                                      marketCapUsd,
                                      name,
                                      priceUsd,
                                      rank,
                                      supply,
                                      symbol,
                                      volumeUsd24Hr,
                                      vwap24Hr
                                  }) => (
                        <TableRow
                            key={id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {rank}
                            </TableCell>
                            <TableCell align="left">
                                <Stack direction="row" spacing={2}>
                                    <Avatar alt={name} src={iconUrl}/>
                                    <Stack>
                                        <Typography variant="body1">
                                            {name}
                                        </Typography>
                                        <Typography variant="caption">
                                            {symbol}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TableCell>
                            <TableCell align="right">{formatPrice(priceUsd, "USD")}</TableCell>
                            <TableCell align="right">{formatPrice(marketCapUsd, "USD")}</TableCell>
                            <TableCell align="right">{formatPrice(vwap24Hr, "USD")}</TableCell>
                            <TableCell align="right">{formatPrice(supply)}</TableCell>
                            <TableCell align="right">{formatPrice(volumeUsd24Hr, "USD")}</TableCell>
                            <TableCell align="right">
                                <Box fontWeight="fontWeightBold"
                                     {...!changePercent24Hr ? {} : (changePercent24Hr > 0 ? {color: green[500]} : {color: red[500]})}
                                >
                                    {`${formatPrice(changePercent24Hr)} %`}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
}

export default CryptosTable;
