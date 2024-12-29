import React, {useEffect, useState} from 'react';
import {Box, Breadcrumbs, Card, CardContent, CardHeader, Divider, Grid, Tab, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {TabContext, TabList} from "@mui/lab";
import {useAuth0} from "@auth0/auth0-react";
import {useTranslation} from "react-i18next";
import SnackbarComponent from "../../common/SnackbarComponent";
import useLogisticManagementApi from "../../../hooks/management/useLogisticManagementApi";
import {LogisticsAnalysis} from './analysis/BarChartAnalysis';
import GeneralTable from "./GeneralTable";
import GeneralModal from "./GeneralModal";
import {generatePDF} from "../../../utils/generatePDF";
import {sortData} from "../../../utils/sortDataUtils";
import useSnackbar from "../../../hooks/management/useSnackbar";
import FloatingActionButton from "../../common/button/FloatingActionButton";
import DownloadPdfButton from "../../common/button/DownloadPdfButton";

const LogisticsAnalysisTab = (data) => {
    return (
        <div>
            <LogisticsAnalysis data={data} />
        </div>
    );
};

const LogisticManagementPage = () => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const { usersData, fetchUsers, addUser, deleteUser, editUser } = useLogisticManagementApi(getAccessTokenSilently);
    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, setSnackbarOpen } = useSnackbar();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [formError, setFormError] = useState('');
    const [selectedTab, setSelectedTab] = useState('1');
    const [users, setUsers] = useState([]);
    const [mode, setMode] = useState('add');
    const [sortConfig, setSortConfig] = useState({ key: 'status', direction: 'desc' });
    const [isLoading, setIsLoading] = useState(false);

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
        quantity: 0,
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

    const handleGeneratePDF = (data) => {
        setIsLoading(true);
        const sortedData = sortData(data, 'itemName');
        const columns = ['Item Name', 'Status', 'Quantity', 'Description'];
        const columnNames = ['itemName', 'status', 'quantity', 'description'];

        generatePDF({
            data: sortedData,
            title: 'Logistics Management Report',
            fileName: 'logistics_report.pdf',
            columns,
            columnNames
        });
        setIsLoading(false);
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

    const filteredUsers = sortData(
        users.filter(user =>
            user.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.status.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        sortConfig.key,
        sortConfig.direction
    );

    const handleOpenModal = (user) => {
        if (!user) {
            setMode('add');
            setSelectedUser(null);
            setNewUser({
                itemName: '',
                description: '',
                status: '',
                quantity: 0
            });
        } else {
            setMode('edit');
            setSelectedUser(user);
            setNewUser({
                itemName: user.itemName || '',
                description: user.description || '',
                status: user.status || '',
                quantity: user.quantity || 0
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
        clearForm();
    };

    const handleSaveUser = (id, updatedUser) => {
        console.log("id");
        if (id) {
            console.log("edit");
            editUser(id, updatedUser)
                .then(() => {
                    setUsers(users.map(user => user.id === id ? updatedUser : user));
                    showSnackbar('User updated successfully', 'success');
                    clearForm();
                    handleCloseModal();
                })
                .catch(() => showSnackbar('Error updating user', 'error'));
        } else {
            console.log("add");
            addUser(newUser)
                .then(() => {
                    setUsers((prev) => [...prev, { ...newUser, quantity: parseFloat(newUser.quantity) }]);
                    showSnackbar('User added successfully', 'success');
                    clearForm();
                })
                .catch(() => {
                    showSnackbar('Error adding user', 'error');
                });
        }
    };

    const handleDeleteUser = (userId) => {
        deleteUser(userId)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
                showSnackbar('User deleted successfully', 'success');
                clearForm();
                handleCloseModal();
            })
            .catch(() => {
                showSnackbar('Error deleting user', 'error');
            });
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: 10 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link color="inherit" to="/mosque" underline="hover">{t('breadcrumb.mosque')}</Link>
                <Typography color="textPrimary">{t('breadcrumb.logisticManagement')}</Typography>
            </Breadcrumbs>

            <TabContext value={selectedTab}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ flexGrow: 1, borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label={t('tabs.logistic.logisticManagement')}>
                            <Tab label={t('tabs.logistic.viewLogistics')} value="1" />
                            <Tab label={t('tabs.logistic.logisticAnalysis')} value="2" />
                        </TabList>
                    </Box>
                    <DownloadPdfButton
                        isLoading={isLoading}
                        handleGeneratePDF={handleGeneratePDF}
                        users={users}
                        t={t}
                    />
                </Box>
            </TabContext>

            {selectedTab === '1' && (
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
            )}

            {selectedTab === '2' && (
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title={t('analysis.logistic.title')} />
                            <CardContent>
                                <Typography variant="body1" paragraph>{t('analysis.logistic.description')}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <LogisticsAnalysisTab data={usersData} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}

            <GeneralModal
                open={openModal}
                onClose={handleCloseModal}
                selectedItem={selectedUser}
                onInputChange={handleInputChange}
                onSave={handleSaveUser}
                fieldConfig={fields}
                t={t}
                module={moduleType}
                mode={mode}
            />

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />

            <FloatingActionButton
                onClick={() => handleOpenModal(null)}
                label={t(`header.${moduleType}`)}
            />
        </Box>
    );
};

export default LogisticManagementPage;
