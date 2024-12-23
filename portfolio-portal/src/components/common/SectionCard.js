import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import {styled} from '@mui/system';

// Styled Card
const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10],
        backgroundColor: theme.palette.action.hover,
    },
    borderRadius: 10,
    boxShadow: theme.shadows[3],
}));

const SectionCard = ({ image, title, description, buttonText, onClick }) => {
    return (
        <StyledCard>
            <CardContent>
                <Card
                    sx={{
                        width: '100%',
                        height: 150,
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 2,
                        marginBottom: 2,
                    }}
                />
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onClick}
                    sx={{
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    {buttonText}
                </Button>
            </CardActions>
        </StyledCard>
    );
};

export default SectionCard;