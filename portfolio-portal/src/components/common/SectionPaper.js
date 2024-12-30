import React from 'react';
import { Paper, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
    boxShadow: theme.shadows[3],
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
}));

const SectionPaper = ({ title, description, buttonText, onClick }) => {
    return (
        <StyledPaper>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {description}
            </Typography>
            <Button variant="contained" color="primary" onClick={onClick}>
                {buttonText}
            </Button>
        </StyledPaper>
    );
};

export default SectionPaper;
