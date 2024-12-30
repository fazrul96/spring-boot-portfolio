import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import FormInput from "../../common/FormInput";

const GeneralModal = ({
                          open,
                          onClose,
                          selectedItem,
                          onInputChange,
                          onSave,
                          fieldConfig,
                          nricError,
                          t,
                          module, mode = 'add'
                      }) => {
    const isEditing = selectedItem !== null;

    return (
        <Dialog open={open} onClose={onClose} mode={mode}>
            <DialogTitle>
                {isEditing && mode === 'edit'
                    ? `${t('buttons.edit')} ${t(`dialog.${module}.title`)}`
                    : `${t('buttons.add')} ${t(`dialog.${module}.title`)}`}
            </DialogTitle>
            <Divider sx={{ marginBottom: '5px' }} />
            <DialogContent>
                <Grid container spacing={2}>
                    {fieldConfig.map(({ name, type, label, isDate, isRequired }) => (
                        <Grid item xs={12} key={name}>
                            <FormInput
                                label={label}
                                name={name}
                                value={selectedItem?.[name] || ''}
                                onChange={onInputChange}
                                error={name === "nric" && nricError}
                                helperText={name === "nric" && nricError ? t('error.nricFormat') : ""}
                                tooltip={t(`dialog.${module}.tooltip.${name}`)}
                                type={type}
                                InputLabelProps={isDate ? { shrink: true } : {}}
                                required={isRequired}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => onSave(selectedItem?.id, selectedItem)}
                    variant="contained"
                >
                    {isEditing && mode === 'edit'
                        ? t('buttons.update')
                        : t('buttons.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GeneralModal;