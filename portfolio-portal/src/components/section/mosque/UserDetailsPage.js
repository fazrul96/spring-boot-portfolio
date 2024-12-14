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

const UserDetailsPage = () => {
    const [users, setUsers] = useState([
        {
            name: 'John Doe',
            address: '123 Main St, Kuala Lumpur',
            nric: '900101-01-1234',
            donation: 100,
            date: '2024-12-12',
        },
        {
            name: 'Jane Smith',
            address: '456 Elm St, Penang',
            nric: '920202-02-2345',
            donation: 200,
            date: '2024-12-10',
        },
    ]);

    const [newUser, setNewUser] = useState({ name: '', address: '', nric: '', donation: '', date: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = () => {
        setUsers((prev) => [...prev, { ...newUser, donation: parseFloat(newUser.donation), date: newUser.date }]);
        setNewUser({ name: '', address: '', nric: '', donation: '', date: '' });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.nric.includes(searchQuery)
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
                <Typography color="textPrimary">User Details</Typography>
            </Breadcrumbs>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Card sx={{ marginBottom: 3 }}>
                        <CardHeader title="Add New User" />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        name="address"
                                        value={newUser.address}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="NRIC"
                                        variant="outlined"
                                        name="nric"
                                        value={newUser.nric}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Donation Amount (RM)"
                                        variant="outlined"
                                        name="donation"
                                        type="number"
                                        value={newUser.donation}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Date"
                                        variant="outlined"
                                        name="date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={newUser.date}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleAddUser}>
                                        Add User
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ marginBottom: 3 }}>
                        <CardHeader title="Search Users" />
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Search by Name, Address, or NRIC"
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>NRIC</TableCell>
                                    <TableCell>Donation Amount (RM)</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.nric}</TableCell>
                                        <TableCell>RM {user.donation.toFixed(2)}</TableCell>
                                        <TableCell>{user.date}</TableCell>
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

export default UserDetailsPage;