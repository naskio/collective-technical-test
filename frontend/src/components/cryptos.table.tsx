import * as React from "react";
import {
    Avatar,
    Box,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import {green, red} from "@mui/material/colors";
import {styled} from '@mui/material/styles';
import {formatPrice} from "../utils/formatters";
import Crypto from "../types/crypto.type";
import {
    DataGrid,
    GridColDef,
    GridValueFormatterParams,
    GridCellParams,
} from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
`;

const formatPriceUsd = (row: GridValueFormatterParams) => formatPrice(Number(row.value), 'USD');

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        hide: true,
    },
    {
        field: 'rank',
        headerName: 'Rank',
        align: "center",
        headerAlign: "center",
        resizable: false,
        minWidth: 80,
        flex: 0.5,
    },
    {
        field: 'name',
        headerName: 'Name',
        align: "left",
        headerAlign: "left",
        resizable: false,
        minWidth: 150,
        flex: 1.2,
        renderCell: ({row}: GridCellParams) => (
            <Stack direction="row" spacing={2}>
                <Avatar alt={row.name} src={row.iconUrl}/>
                <Stack>
                    <Typography variant="body1">
                        {row.name}
                    </Typography>
                    <Typography variant="caption">
                        {row.symbol}
                    </Typography>
                </Stack>
            </Stack>
        ),
    },
    {
        field: 'priceUsd',
        headerName: 'Price',
        align: "right",
        headerAlign: "right",
        resizable: false,
        minWidth: 120,
        flex: 1,
        valueFormatter: formatPriceUsd,
    },
    {
        field: 'marketCapUsd',
        headerName: 'Market Cap',
        align: "right",
        headerAlign: "right",
        resizable: false,
        minWidth: 140,
        flex: 1.1,
        valueFormatter: formatPriceUsd,
    },
    {
        field: 'vwap24Hr',
        headerName: 'VWAP (24Hr)',
        align: "right",
        headerAlign: "right",
        resizable: false,
        minWidth: 120,
        flex: 1,
        valueFormatter: formatPriceUsd,
    },
    {
        field: 'supply',
        headerName: 'Supply',
        align: "right",
        headerAlign: "right",
        resizable: false,
        minWidth: 140,
        flex: 1.1,
        valueFormatter: (row: GridValueFormatterParams) => formatPrice(Number(row.value)),
    },
    {
        field: 'volumeUsd24Hr',
        headerName: 'Volume (24Hr)',
        align: "right",
        headerAlign: "right",
        resizable: false,
        minWidth: 140,
        flex: 1.1,
        valueFormatter: formatPriceUsd,
    },
    {
        field: 'changePercent24Hr',
        headerName: 'Change (24Hr)',
        align: "right",
        headerAlign: "right",
        resizable: false,
        minWidth: 120,
        flex: 1,
        renderCell: ({row}: GridCellParams) => (
            <Box fontWeight="fontWeightBold" mr={2}
                 {...!row.changePercent24Hr ? {} : (row.changePercent24Hr > 0 ? {color: green[500]} : {color: red[500]})}
            >
                {`${formatPrice(row.changePercent24Hr)} %`}
            </Box>
        ),
    },
];


function CryptosTable({cryptos}: { cryptos: Crypto[] }) {
    return (
        <>
            <Paper sx={{minWidth: 650}}>
                <StyledDataGrid
                    autoHeight
                    rows={cryptos}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    density={"standard"}
                    disableSelectionOnClick
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSelector
                    disableDensitySelector
                />
            </Paper>
        </>
    )
}

export default CryptosTable;
