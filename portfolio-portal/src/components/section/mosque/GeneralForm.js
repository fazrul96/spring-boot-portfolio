import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, CardHeader, Grid, Tooltip} from "@mui/material";
import LanguageSwitcherI18n from "../../common/LanguageSwitcherI18n";
import FormInput from "../../common/FormInput";

const GeneralForm = ({
                         newItem,
                         errors,
                         onInputChange,
                         onAddItem,
                         fieldConfig,
                         buttonText,
                         tooltipText,
                         headerTitle,
                         t,
                         loading,
                         module
                     }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allFieldsFilled = fieldConfig.every(
            ({ name, isRequired }) => isRequired && newItem[name] && newItem[name].trim() !== ""
        );
        setIsFormValid(allFieldsFilled);
    }, [newItem, fieldConfig]);
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title={headerTitle || t("header")}
                        action={
                            <Tooltip title={t("languageSwitcher.text")} arrow>
                                <LanguageSwitcherI18n />
                            </Tooltip>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            {(fieldConfig || []).map(({ name, type, label, inputProps, isDate, isRequired, options }) => (
                                <FormInput
                                    key={name}
                                    label={label}
                                    name={name}
                                    value={newItem?.[name] || ''}
                                    onChange={onInputChange}
                                    error={!!errors?.[name]}
                                    helperText={errors?.[name] || ''}
                                    tooltip={t(`dialog.${module}.tooltip.${name}`)}
                                    inputProps={inputProps || (name === "donation" ? { min: 0 } : {})}
                                    type={type}
                                    required={isRequired}
                                    InputLabelProps={isDate ? { shrink: true } : {}}
                                    select={type === "select"}
                                    options={options}
                                />
                            ))}

                            <Grid item xs={12}>
                                <Tooltip title={loading ? tooltipText.adding : tooltipText.addItem} arrow>
                                    <span>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onAddItem}
                                            disabled={loading || !isFormValid}
                                        >
                                            {loading ? t(`buttons.adding`) : buttonText || t(`button.addItem`)}
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default GeneralForm;
