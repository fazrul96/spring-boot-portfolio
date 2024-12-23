import React, {useEffect, useState} from 'react';
import {Box, Breadcrumbs, Card, CardContent, CardHeader, Divider, Grid, Tab, Typography,} from '@mui/material';
import {Link} from 'react-router-dom';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {useAuth0} from "@auth0/auth0-react";
import {useTranslation} from "react-i18next";

import SnackbarComponent from "../../common/SnackbarComponent";
import useLogisticManagementApi from "../../../hooks/management/useLogisticManagementApi";
import {LogisticsAnalysis} from './analysis/BarChartAnalysis';
import GeneralForm from "./GeneralForm";
import GeneralTable from "./GeneralTable";
import GeneralModal from "./GeneralModal";

const LogisticsAnalysisTab = (data) => {
    return (
        <div>
            <LogisticsAnalysis data={data} />
        </div>
    );
};

const LogisticManagementPage = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { usersData, loading, error, fetchUsers, addUser, deleteUser, editUser } = useLogisticManagementApi(getAccessTokenSilently);
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [formError, setFormError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedTab, setSelectedTab] = useState('1');
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'status', direction: 'desc' });  // Default sort by date, descending

    const moduleType = "logistic";
    const createField = (name, type = "text", options = null, isRequired = true, inputProps = {}) => ({
        name,
        type,
        label: t(`dialog.${moduleType}.form.${name}`),
        isRequired,
        inputProps,
        options
    });

    const fields = [
        createField("itemName"),
        createField("status", "select", [
            { value: 'Available', label: t(`dialog.${moduleType}.form.available`) },
            { value: 'In Use', label: t(`dialog.${moduleType}.form.inUse`) },
            { value: 'Out of Stock', label: t(`dialog.${moduleType}.form.outOfStock`) },
        ]),
        createField("quantity", "number", null, true, { min: 0 }),
        createField("description")
    ];

    const [newUser, setNewUser] = useState({
        itemName: '',
        description: '',
        quantity: 1,
        status: ''
    });

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (usersData) {
            setUsers(usersData);
        }
    }, [usersData]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
        setSelectedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSort = (column) => {
        setSortConfig(prev => ({
            key: column,
            direction: prev.key === column && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearForm = () => {
        setNewUser({
            itemName: "",
            description: "",
            quantity: "",
            status: ""
        });
        setFormError("");
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filteredUsers = users
        .filter(user =>
            user.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.status.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const { key, direction } = sortConfig;
            let valueA = a[key], valueB = b[key];

            if (key === 'date') {
                valueA = new Date(a[key]);
                valueB = new Date(b[key]);
            } else if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return direction === 'desc' ? valueB - valueA : valueA - valueB;
            }

            return direction === 'desc' ? (valueB > valueA ? 1 : -1) : (valueA > valueB ? 1 : -1);
        });

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setNewUser({
            itemName: user.itemName,
            description: user.description,
            status: user.status,
            quantity: user.quantity
        });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
        clearForm();
    };

    const handleSaveUser = (id, updatedUser) => {
        editUser(id, updatedUser)
            .then(() => {
                setUsers(users.map(user => user.id === id ? updatedUser : user));
                showSnackbar('User updated successfully', 'success');
                clearForm();
                handleCloseModal();
            })
            .catch(() => showSnackbar('Error updating user', 'error'));
    };

    const handleAddUser = () => {
        addUser(newUser)
            .then(() => {
                setUsers((prev) => [...prev, { ...newUser,
                    quantity: parseFloat(newUser.quantity) }]);
                showSnackbar('User added successfully', 'success');
                clearForm();
            })
            .catch(() => {
                showSnackbar('Error adding user', 'error');
            });
    };

    const handleDeleteUser = (userId) => {
        deleteUser(userId)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId)); // Remove user from local state
                showSnackbar('User deleted successfully', 'success');
                clearForm();
                handleCloseModal();
            })
            .catch(() => {
                showSnackbar('Error deleting user', 'error');
            });
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: 10 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link color="inherit" to="/mosque" underline="hover">{t('breadcrumb.mosque')}</Link>
                <Typography color="textPrimary">{t('breadcrumb.logisticManagement')}</Typography>
            </Breadcrumbs>

            <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label={t('tabs.logistic.logisticManagement')}>
                        <Tab label={t('tabs.logistic.addLogistic')} value="1" />
                        <Tab label={t('tabs.logistic.viewLogistics')} value="2" />
                        <Tab label={t('tabs.logistic.logisticAnalysis')} value="3" />
                    </TabList>
                </Box>

                <TabPanel value="1">
                    <GeneralForm
                        newItem={newUser}
                        errors={formError}
                        onInputChange={handleInputChange}
                        onAddItem={handleAddUser}
                        fieldConfig={fields}
                        buttonText={t('buttons.addLogistic')}
                        tooltipText={{
                            adding: t('tooltip.adding'),
                            addItem: t('tooltip.addLogistic')
                        }}
                        headerTitle={t('header.logistic')}
                        t={t}
                        module={moduleType}
                    />
                </TabPanel>

                <TabPanel value="2">
                    <GeneralTable
                        data={filteredUsers}
                        columns={fields}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSort={handleSort}
                        onAction={handleDeleteUser}
                        onOpenModal={handleOpenModal}
                        t={t}
                        actionButtonText={t('buttons.delete')}
                    />
                </TabPanel>

                <TabPanel value="3">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title={t('analysis.logistic.title')} />
                                <CardContent>
                                    <Typography variant="body1" paragraph>{t('analysis.logistic.description')}</Typography>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <LogisticsAnalysisTab data={usersData}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>

            <GeneralModal
                open={openModal}
                onClose={handleCloseModal}
                selectedItem={selectedUser}
                onInputChange={handleInputChange}
                onSave={handleSaveUser}
                fieldConfig={fields}
                t={t}
                module={moduleType}
            />

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </Box>
    );
};

export default LogisticManagementPage;
