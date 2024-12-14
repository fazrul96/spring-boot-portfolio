import React from "react";
import {Chip, Grid, Typography} from "@mui/material";

const InfoDisplay = ({ label, data, separator = ",", isDate = false }) => {
    if (isDate && data) {
        // Handle date formatting if `isDate` is true
        data = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(data));
    }

    const dataArray = data && !isDate ? data.split(new RegExp(`\\s*${separator}\\s*`)) : [];

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                <strong>{label}:</strong>
            </Typography>
            {data ? (
                isDate ? (
                    <Typography variant="body2" color="text.secondary">{data}</Typography>
                ) : (
                    dataArray.map((item, index) => (
                        <Chip
                            key={index}
                            label={item}
                            size="small"
                            sx={{ marginRight: 1, marginBottom: 1 }}
                        />
                    ))
                )
            ) : (
                <Typography variant="body2" color="text.secondary">-</Typography>
            )}
        </Grid>
    );
};

export default InfoDisplay;
