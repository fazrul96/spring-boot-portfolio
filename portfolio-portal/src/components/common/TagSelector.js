import React from 'react';
import {FormControl, InputLabel, MenuItem, Select,} from '@mui/material';

const TagSelector = ({ tags, availableTags, onTagChange }) => (
    <FormControl fullWidth variant="standard" margin="dense">
        <InputLabel id="tag-select-label">Tags</InputLabel>
        <Select
            labelId="tag-select-label"
            multiple
            value={tags}
            onChange={onTagChange}
            renderValue={(selected) => selected.join(', ')}
        >
            {availableTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                    {tag}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default TagSelector;