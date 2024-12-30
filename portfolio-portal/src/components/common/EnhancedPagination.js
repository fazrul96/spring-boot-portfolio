import React from 'react';
import { TablePagination, Box, CircularProgress, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EnhancedPagination = ({
                                data,
                                rowsPerPage,
                                page,
                                handleChangePage,
                                handleChangeRowsPerPage,
                                loading,
                            }) => {
    const theme = useTheme();

    return (
        <Grid
            container
            justifyContent="center" // Center the pagination
            alignItems="center"
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={12}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        width: '100%',
                        padding: '8px 16px',
                        borderRadius: 1,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[1],
                    }}
                >
                    {/* Table Pagination */}
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]} // Options for rows per page
                        component="div"
                        count={data.length} // Total number of items
                        rowsPerPage={rowsPerPage} // Rows per page
                        page={page} // Current page
                        onPageChange={handleChangePage} // Handle page change
                        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
                        showFirstButton
                        showLastButton
                        sx={{
                            '& .MuiTablePagination-select': {
                                marginRight: 2, // Space between select and buttons
                            },
                            '& .MuiTablePagination-actions': {
                                display: 'flex',
                                justifyContent: 'center', // Center pagination actions (buttons)
                            },
                            '& .MuiTablePagination-actions button': {
                                fontSize: '0.875rem',
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            },
                            ...(loading && {
                                opacity: 0.6, // Fade the pagination when loading
                                pointerEvents: 'none', // Disable interactions when loading
                            }),
                        }}
                    />

                    {/* Loading Spinner */}
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: theme.palette.primary.main,
                                zIndex: 10,
                            }}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default EnhancedPagination;
