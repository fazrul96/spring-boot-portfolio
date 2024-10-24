import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Divider,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Tooltip,
    Grid,
    Chip,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProjectTimelineItem from '../../../components/section/projects/ProjectTimelineItem';
import { DEFAULT_IMAGE, STATUS_COLOR, GITHUB_URL } from '../../../constants/AppConstants'; // Adjust the path based on your structure

const CustomChip = memo(({ label }) => (
    <Chip
        variant="outlined"
        size="small"
        label={label}
        sx={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))`,
            backgroundSize: 'cover',
        }}
    />
));

const ProjectDetailsDialog = ({ open, onClose, project, tags }) => {
    const img = project.img || DEFAULT_IMAGE;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Project Details</DialogTitle>
            <DialogContent
                dividers
                sx={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${img}")`,
                    backgroundSize: 'cover'
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={10}>
                        <ProjectTimelineItem
                            list={project.list}
                            title={project.title}
                            description={project.description}
                            chips={tags.map((tag, index) => ({
                                key: index,
                                label: tag
                            }))}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

const ProjectCard = ({ project, onEdit, onDelete }) => {
    const { title, img, status, list, tag } = project;
    const tags = tag ? tag.split("|") : [];
    const [open, setOpen] = useState(false);
    const descriptionElementRef = useRef(null);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (open && descriptionElementRef.current) {
            descriptionElementRef.current.focus();
        }
    }, [open]);

    return (
        <React.Fragment>
            <Card sx={{ marginBottom: '20px' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={img || DEFAULT_IMAGE}
                        alt="Project Image"
                    />
                    <CardContent onClick={handleClickOpen}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                            <Stack direction="row" spacing={0.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {tags.map((tag, index) => (
                                    <CustomChip key={index} label={tag} />
                                ))}
                            </Stack>
                        </Typography>
                        <Typography variant="body2" color={STATUS_COLOR[status] || 'text.primary'}>
                            {status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {list}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider />
                <Stack direction="row" spacing={2} sx={{ padding: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActionButton
                        title="Edit"
                        icon={<EditIcon />}
                        onClick={onEdit}
                    />
                    <ActionButton
                        title="Delete"
                        icon={<DeleteIcon />}
                        onClick={onDelete}
                        color="error"
                    />
                    <ActionButton
                        title="GitHub"
                        icon={<GitHubIcon />}
                        onClick={() => window.open(GITHUB_URL, '_blank')}
                    />
                </Stack>
            </Card>

            <ProjectDetailsDialog
                open={open}
                onClose={handleClose}
                project={project}
                tags={tags}
            />
        </React.Fragment>
    );
};

const ActionButton = ({ title, icon, onClick, color = 'primary' }) => (
    <Box display="flex" alignItems="center">
        <Tooltip title={title} arrow>
            <IconButton color={color} onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
        <Typography variant="body2" sx={{ marginLeft: 0.5 }}>{title}</Typography>
    </Box>
);

export default ProjectCard;
