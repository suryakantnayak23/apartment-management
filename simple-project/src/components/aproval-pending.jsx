import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Button, TextField, InputAdornment, Typography, Box, Paper, CardContent, Grid} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import panna from '../assets/Startup life-pana.svg'
import {Card} from "reactstrap";

const initialRows = [
    {
        id: 1,
        photo: '/src/assets/user.png',
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'johndoe@example.com',
        address: '123 Main St, City',
        ownerType: 'Owner',
        houseType: 'Apartment',
        ownerInsideApartment: 'Yes',
    },
    {
        id: 2,
        photo: '/src/assets/user.png',
        name: 'Jane Smith',
        phone: '987-654-3210',
        email: 'janesmith@example.com',
        address: '456 Elm St, Town',
        ownerType: 'Tenant',
        houseType: 'Villa',
        ownerInsideApartment: 'No',
    },
];

export default function ApprovalPending() {
    const [searchQuery, setSearchQuery] = useState('');
    const [rows, setRows] = useState(initialRows);
    const [filteredRows, setFilteredRows] = useState(rows);

    const columns = [
        { field: 'id', headerName: 'SI No', width: 70 },
        {
            field: 'photo',
            headerName: 'Photo',
            width: 100,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="User"
                    style={{ width: '40px', borderRadius: '50%' }}
                />
            ),
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'ownerType', headerName: 'Owner Type', width: 130 },
        { field: 'houseType', headerName: 'House Type', width: 130 },
        { field: 'ownerInsideApartment', headerName: 'Owner Inside Apartment', width: 180 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleApprove(params.row)}
                        sx={{
                            textTransform: 'capitalize',
                            borderRadius: '15px',
                            marginRight: '8px',
                        }}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleReject(params.row)}
                        sx={{
                            textTransform: 'capitalize',
                            borderRadius: '15px',
                        }}
                    >
                        Reject
                    </Button>
                </Box>
            ),
        },
    ];

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
        const filtered = rows.filter((row) =>
            Object.values(row).some((field) =>
                String(field).toLowerCase().includes(value)
            )
        );
        setFilteredRows(filtered);
    };

    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Approval Pending');
        XLSX.writeFile(workbook, 'ApprovalPending.xlsx');
    };

    const handleApprove = (user) => {
        // Implement approve logic here
        console.log('Approve', user);
    };

    const handleReject = (user) => {
        // Implement reject logic here
        console.log('Reject', user);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                APPROVAL PENDING
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    value={searchQuery}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        borderRadius: '50px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                        },
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    startIcon={<DownloadIcon />}
                    sx={{
                        borderRadius: '50px',
                        textTransform: 'capitalize',
                        padding: '8px 16px',
                    }}
                >
                    Download
                </Button>
            </Box>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
}