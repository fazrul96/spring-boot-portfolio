import React from 'react';
import {Button, Tooltip} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadButton = ({ onClick, disabled, label }) => (
    <Button onClick={onClick} disabled={disabled}>
        <Tooltip title={label} arrow>
            <DownloadIcon />
        </Tooltip>
    </Button>
);

export default DownloadButton;
