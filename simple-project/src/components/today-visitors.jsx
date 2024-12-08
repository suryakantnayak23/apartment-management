import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, InputAdornment, Typography, Box, Tabs, Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import * as XLSX from 'xlsx';

const initialRows = [
    {
        id: 1,
        photo: '/src/assets/user.png',
        name: 'John Doe',
        phone: '123-456-7890',
        vehicleNo: 'ABC123',
        visitingDate: '2023-12-08',
        allowedBy: 'Admin',
        purpose: 'Meeting',
        address: '123 Main St',
    },
    {
        id: 2,
        photo: '/src/assets/user.png',
        name: 'Jane Smith',
        phone: '987-654-3210',
        vehicleNo: 'XYZ789',
        visitingDate: '2023-12-08',
        allowedBy: 'Security',
        purpose: 'Delivery',
        address: '456 Elm St',
    },
];

export default function TodayVisitor() {
    const [searchQuery, setSearchQuery] = useState('');
    const [rows, setRows] = useState(initialRows);
    const [filteredRows, setFilteredRows] = useState(rows);
    const [activeTab, setActiveTab] = useState('normal');

    const columns = {
        normal: [
            { field: 'id', headerName: 'SI No', width: 70 },
            {
                field: 'photo',
                headerName: 'Photo',
                width: 100,
                renderCell: (params) => (
                    <img
                        src={params.value}
                        alt="Visitor"
                        style={{ width: '40px', borderRadius: '50%' }}
                    />
                ),
            },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'phone', headerName: 'Phone', width: 150 },
            { field: 'vehicleNo', headerName: 'Vehicle No', width: 120 },
            { field: 'visitingDate', headerName: 'Visiting Date', width: 150 },
            { field: 'allowedBy', headerName: 'Allowed By', width: 130 },
            { field: 'purpose', headerName: 'Purpose', width: 130 },
            { field: 'address', headerName: 'Address', width: 200 },
            {
                field: 'action',
                headerName: 'View',
                width: 100,
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleView(params.row)}
                        sx={{
                            textTransform: 'capitalize',
                            borderRadius: '15px',
                        }}
                    >
                        View
                    </Button>
                ),
            },
        ],
        regular: [
            { field: 'id', headerName: 'SI No', width: 70 },
            {
                field: 'photo',
                headerName: 'Photo',
                width: 100,
                renderCell: (params) => (
                    <img
                        src={params.value}
                        alt="Visitor"
                        style={{ width: '40px', borderRadius: '50%' }}
                    />
                ),
            },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'phone', headerName: 'Phone', width: 150 },
            { field: 'visitingDate', headerName: 'Visiting Date', width: 150 },
            { field: 'allowedBy', headerName: 'Allowed By', width: 130 },
            { field: 'purpose', headerName: 'Purpose', width: 130 },
            { field: 'address', headerName: 'Address', width: 200 },
        ],
        delivery: [
            { field: 'id', headerName: 'SI No', width: 70 },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'phone', headerName: 'Phone', width: 150 },
            { field: 'vehicleNo', headerName: 'Vehicle No', width: 120 },
            { field: 'entryTime', headerName: 'Entry Time', width: 150 },
            { field: 'exitTime', headerName: 'Exit Time', width: 150 },
            { field: 'allowedBy', headerName: 'Allowed By', width: 130 },
            { field: 'purpose', headerName: 'Purpose', width: 130 },
            { field: 'comment', headerName: 'Comment', width: 200 },
            { field: 'block', headerName: 'Block', width: 100 },
            { field: 'house', headerName: 'House', width: 100 },
            {
                field: 'action',
                headerName: 'Delivery View',
                width: 150,
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleDeliveryView(params.row)}
                        sx={{
                            textTransform: 'capitalize',
                            borderRadius: '15px',
                        }}
                    >
                        Delivery View
                    </Button>
                ),
            },
        ],
    };

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
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Today Visitors');
        XLSX.writeFile(workbook, 'TodayVisitors.xlsx');
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleView = (visitor) => {
        // Implement view logic here
        console.log('View', visitor);
    };

    const handleDeliveryView = (delivery) => {
        // Implement delivery view logic here
        console.log('Delivery View', delivery);
    };

    const handleFilter = () => {
        // Implement filter logic here
        console.log('Filter');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                TODAY'S VISITOR
            </Typography>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Normal Visitor" value="normal" />
                <Tab label="Regular Visitor" value="regular" />
                <Tab label="Delivery Boy" value="delivery" />
                <Tab label="Filter By Date" value="filter" />
            </Tabs>
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
                <Box>
                    {activeTab === 'filter' && (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleFilter}
                            startIcon={<FilterListIcon />}
                            sx={{
                                borderRadius: '50px',
                                textTransform: 'capitalize',
                                padding: '8px 16px',
                                marginRight: '8px',
                            }}
                        >
                            Filter
                        </Button>
                    )}
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
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns[activeTab]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
}