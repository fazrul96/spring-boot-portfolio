import React from "react";
import {Card, CardContent, TextField} from "@mui/material";

const SearchBar = ({ searchQuery, onSearchChange, t }) => {
    return (
        <Card sx={{ marginBottom: 3 }}>
            <CardContent>
                <TextField
                    fullWidth
                    label={t("search.label")}
                    variant="outlined"
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </CardContent>
        </Card>
    );
};

export default SearchBar;
