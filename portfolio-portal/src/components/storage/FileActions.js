import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

const FileActions = ({ fileName, onDownload, onDelete }) => (
    <Box>
        <Tooltip title="Download">
            <IconButton color="primary" onClick={() => onDownload(fileName)}>
                <DownloadIcon />
            </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(fileName)}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    </Box>
);

export default FileActions;