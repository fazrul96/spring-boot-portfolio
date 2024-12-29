import React from 'react';
import {Fab, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FloatingActionButton = ({
                                  onClick,
                                  label = "Add New Item",
                                  icon = <AddIcon />,
                                  color = "primary",
                                  sx = {},
                              }) => {
    return (
        <Fab
            color={color}
            aria-label="add"
            onClick={onClick}
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: 6,
                },
                ...sx,
            }}
        >
            <Tooltip title={label}>
                {icon}
            </Tooltip>
        </Fab>
    );
};

export default FloatingActionButton;
