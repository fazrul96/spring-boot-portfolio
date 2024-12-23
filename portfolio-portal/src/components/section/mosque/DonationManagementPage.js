import React, {useEffect, useState} from 'react';
import {Box, Breadcrumbs, Card, CardContent, CardHeader, Divider, Grid, Tab, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {useAuth0} from '@auth0/auth0-react';
import {useTranslation} from 'react-i18next';

import SnackbarComponent from '../../../components/common/SnackbarComponent';
import useUserManagementApi from "../../../hooks/management/useUserManagementApi";
import useSnackbar from "../../../hooks/management/useSnackbar";
import GeneralModal from "./GeneralModal";
import GeneralForm from "./GeneralForm";
import GeneralTable from "./GeneralTable"
import DonationInsights from './analysis/DonationInsights';
import DonationTrendChart from './analysis/DonationTrendChart';
import {DonationAnalysis, TopDonorsAnalysis} from './analysis/BarChartAnalysis';
import {validateNric} from '../../../utils/dataProcessingUtils';

const DonationAnalysisTab = (data) => {
    return (<div><DonationAnalysis data={data}/></div>);
};

const TopDonorsAnalysisTab = ({ data, t }) => {
    return (<div><TopDonorsAnalysis data={data} t={t}/></div>);
};

const DonationManagementPage = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { usersData, fetchUsers, addUser, deleteUser, editUser } = useUserManagementApi(getAccessTokenSilently);
    const { t } = useTranslation();
    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, setSnackbarOpen } = useSnackbar();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [nricError, setNricError] = useState('');
    const [selectedTab, setSelectedTab] = useState('1');
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });  // Default sort by date, descending

    const moduleType = "donation";
    const createField = (name, type = "text", options = null, isRequired = true, inputProps = {}, isDate = false) => {
        const labelKey = name === "donation"
            ? `dialog.${moduleType}.form.donationAmount`
            : `dialog.${moduleType}.form.${name}`;

        return {
            name,
            type,
            label: t(labelKey),
            isRequired,
            inputProps,
            isDate,
            options,
        };
    };
    const fields = [
        createField("name"),
        createField("nric"),
        createField("donation", "number", null, true, { min: 0 }),
        createField("date", "date", null, true, {}, true),
        createField("address"),
    ];
    const optionalFields = [
        { name: "age", type: "text", label: t(`tableHeaders.${moduleType}.age`), isRequired: false },
    ];
    const [newUser, setNewUser] = useState({name: '', nric: '', address: '', donation: 0, date: ''});

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

        if (name === 'nric' && value) {
            setNricError(validateNric(value) ? '' : t('error.nricFormat'));
        }
    };
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const filteredUsers = users
        .filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.nric.includes(searchQuery)
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
            name: "",
            nric: "",
            date: "",
            address: "",
            donation: ""
        });
        setNricError("");
    };

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setNewUser({
            name: user.name,
            nric: user.nric,
            address: user.address,
            donation: user.donation,
            date: user.date,
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
                setUsers(prev => [...prev, { ...newUser, donation: parseFloat(newUser.donation), date: newUser.date }]);
                showSnackbar('User added successfully', 'success');
                clearForm();
            })
            .catch(() => showSnackbar('Error adding user', 'error'));
    };

    const handleDeleteUser = (userId) => {
        deleteUser(userId)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
                showSnackbar('User deleted successfully', 'success');
                clearForm();
                handleCloseModal();
            })
            .catch(() => showSnackbar('Error deleting user', 'error'));
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: 10 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link color="inherit" to="/mosque" underline="hover">{t('breadcrumb.mosque')}</Link>
                <Typography color="textPrimary">{t('breadcrumb.donationManagement')}</Typography>
            </Breadcrumbs>

            <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label={t(`tabs.${moduleType}.donationManagement`)}>
                        <Tab label={t(`tabs.${moduleType}.addDonation`)} value="1" />
                        <Tab label={t(`tabs.${moduleType}.viewDonations`)} value="2" />
                        <Tab label={t(`tabs.${moduleType}.donationAnalysis`)} value="3" />
                    </TabList>
                </Box>

                <TabPanel value="1">
                    <GeneralForm
                        newItem={newUser}
                        onInputChange={handleInputChange}
                        onAddItem={handleAddUser}
                        fieldConfig={fields}
                        buttonText={t('buttons.addDonation')}
                        tooltipText={{
                            adding: t(`dialog.${moduleType}.tooltip.adding`),
                            addItem: t(`dialog.${moduleType}.tooltip.addDonation`)
                        }}
                        headerTitle={t('header.donation')}
                        t={t}
                        module={moduleType}
                    />
                </TabPanel>

                {/* Tab 2 - View Donations */}
                <TabPanel value="2">
                    <GeneralTable
                        data={filteredUsers}
                        columns={fields}
                        optionalColumns={optionalFields}
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
                                <CardHeader title="Donations Over Time" />
                                <CardContent>
                                    <Typography variant="body1" paragraph>{t(`analysis.${moduleType}.description`)}</Typography>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <DonationTrendChart data={usersData} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Donation Insights" />
                                <CardContent>
                                    <Typography variant="body1" paragraph>{t(`analysis.${moduleType}.description`)}</Typography>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <DonationInsights data={usersData} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title={t(`analysis.${moduleType}.title`)} />
                                <CardContent>
                                    <Typography variant="body1" paragraph>{t(`analysis.${moduleType}.description`)}</Typography>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <DonationAnalysisTab data={usersData} t={t}/>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title={t(`analysis.topDonors.title`)} />
                                <CardContent>
                                    <Typography variant="body1" paragraph>{t(`analysis.topDonors.description`)}</Typography>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <TopDonorsAnalysisTab data={users} t={t}/>
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
                nricError={nricError}
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

export default DonationManagementPage;