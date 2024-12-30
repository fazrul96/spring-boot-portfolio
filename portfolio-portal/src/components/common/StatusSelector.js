import React from 'react';
import {FormControl, InputLabel, MenuItem, Select,} from '@mui/material';

const StatusSelector = ({ status, availableStatuses, onStatusChange }) => (
    <FormControl fullWidth variant="standard" margin="dense">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
            labelId="status-select-label"
            value={status}
            onChange={onStatusChange}
        >
            {availableStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                    {status}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default StatusSelector;