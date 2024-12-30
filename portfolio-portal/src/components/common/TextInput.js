import React from 'react';
import {TextField} from '@mui/material';

const TextInput = ({ name, label, value, onChange, required = false }) => (
    <TextField
        margin="dense"
        name={name}
        label={label}
        type="text"
        fullWidth
        required={required}
        variant="standard"
        value={value}
        onChange={onChange}
    />
);

export default TextInput;