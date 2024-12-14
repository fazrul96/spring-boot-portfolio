import React, {useState} from 'react';
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import {Link} from "react-router-dom";
import {navigate} from "react-big-calendar/lib/utils/constants";

const LogisticsPage = () => {
    const [logistics, setLogistics] = useState([
        {
            itemName: 'Sound System',
            description: 'Portable sound system for events',
            quantity: 5,
            status: 'Available',
        },
        {
            itemName: 'Chairs',
            description: 'Foldable chairs for seating',
            quantity: 50,
            status: 'In Use',
        },
    ]);

    const [newLogistic, setNewLogistic] = useState({ itemName: '', description: '', quantity: '', status: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLogistic((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddLogistic = () => {
        setLogistics((prev) => [...prev, { ...newLogistic, quantity: parseInt(newLogistic.quantity, 10) }]);
        setNewLogistic({ itemName: '', description: '', quantity: '', status: '' });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredLogistics = logistics.filter(
        (logistic) =>
            logistic.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            logistic.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: 10 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link
                    color="inherit"
                    onClick={() => handleNavigate('/mosque')}
                    underline="hover"
                    style={{ cursor: 'pointer' }}
                to={'/mosque'}>
                    Mosque
                </Link>
                <Typography color="textPrimary">Logistics</Typography>
            </Breadcrumbs>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Card sx={{ marginBottom: 3 }}>
                        <CardHeader title="Add New Logistic Item" />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Item Name"
                                        variant="outlined"
                                        name="itemName"
                                        value={newLogistic.itemName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        name="description"
                                        value={newLogistic.description}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Quantity"
                                        variant="outlined"
                                        name="quantity"
                                        type="number"
                                        value={newLogistic.quantity}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Status"
                                        variant="outlined"
                                        name="status"
                                        value={newLogistic.status}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleAddLogistic}>
                                        Add Logistic Item
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ marginBottom: 3 }}>
                        <CardHeader title="Search Logistic Items" />
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Search by Item Name or Description"
                                variant="outlined"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLogistics.map((logistic, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{logistic.itemName}</TableCell>
                                        <TableCell>{logistic.description}</TableCell>
                                        <TableCell>{logistic.quantity}</TableCell>
                                        <TableCell>{logistic.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LogisticsPage;