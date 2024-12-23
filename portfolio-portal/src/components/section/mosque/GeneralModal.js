import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import React from "react";
import FormInput from "../../common/FormInput";

const GeneralModal = ({
                          open,
                          onClose,
                          selectedItem,
                          onInputChange,
                          onSave,
                          fieldConfig,
                          nricError,
                          t, module
                      }) => {
    if (!selectedItem) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t(`dialog.${module}.title`)}</DialogTitle>
            <Divider sx={{ marginBottom: '5px' }} />
            <DialogContent>
                <Grid container spacing={2}>
                    {fieldConfig.map(({ name, type, label, isDate, isRequired }) => (
                        <FormInput
                            key={name}
                            label={label}
                            name={name}
                            value={selectedItem?.[name] || ''}
                            onChange={onInputChange}
                            error={name === "nric" && nricError}
                            helperText={name === "nric" && nricError}
                            tooltip={t(`dialog.${module}.tooltip.${name}`)}
                            type={type}
                            InputLabelProps={isDate ? { shrink: true } : {}}
                            required={isRequired}
                        />
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onSave(selectedItem?.id, selectedItem)} color="primary">
                    {t('buttons.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GeneralModal;