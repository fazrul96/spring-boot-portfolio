import React from 'react';
import { Grid, TextField, Tooltip, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

const FormInput = ({
                       label,
                       name,
                       value,
                       onChange,
                       error,
                       helperText,
                       tooltip,
                       inputProps = {},
                       type = 'text',
                       InputLabelProps = {},
                       select = false,
                       options = []
                   }) => {
    const inputField = select ? (
        <FormControl fullWidth error={!!error}>
            <InputLabel {...InputLabelProps}>{label}</InputLabel>
            <Select
                name={name}
                value={value || ''}
                onChange={onChange}
                inputProps={inputProps}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && (
                <Typography variant="body2" color="error">
                    {helperText}
                </Typography>
            )}
        </FormControl>
    ) : (
        <TextField
            fullWidth
            label={label}
            variant="outlined"
            name={name}
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={helperText || ''}
            type={type}
            inputProps={inputProps}
            InputLabelProps={InputLabelProps}
        />
    );

    return (
        <Grid item xs={12}>
            {tooltip ? (
                <Tooltip title={tooltip || ''} arrow enterDelay={500} leaveDelay={200}>
                    <div>{inputField}</div>
                </Tooltip>
            ) : (
                inputField
            )}
        </Grid>
    );
};

export default FormInput;
