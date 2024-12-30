import React from 'react';
import {Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography} from '@mui/material';
import {DEFAULT_IMAGE} from '../../../constants/AppConstants';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const WebtoonCard = ({ webtoon, onClick, onDelete, onEdit }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 4,
                },
            }}
        >
            <CardMedia
                component="img"
                image={webtoon?.coverImage || DEFAULT_IMAGE}
                alt={webtoon?.title || 'Webtoon Cover'}
                sx={{
                    width: '100%',
                    height: {
                        xs: '200px',
                        sm: '250px',
                        md: '350px',
                        lg: '450px',
                    },
                    objectFit: 'cover',
                }}
            />
            <CardContent
                sx={{ flexGrow: 1, cursor: 'pointer', padding: 2 }}
                onClick={onClick}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {webtoon?.alias || 'Untitled'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Chapter {webtoon?.chapterCount || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ★★★★★ {webtoon?.rating || 'N/A'}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', padding: 1 }}>
                <Tooltip title="Read">
                    <IconButton color="primary" onClick={onClick}>
                        <VisibilityOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton color="secondary" onClick={onEdit}>
                        <EditOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={onDelete}>
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default WebtoonCard;