import React from "react";
import {TableCell, TableRow} from "@mui/material";

const TableHeader = ({ columns, optionalColumns, onSort, showDeleteButton, t }) => {
    const renderTableHeaderCells = (columnsArray) => {
        return columnsArray.map((column) => (
            <TableCell
                key={column.name}
                onClick={() => column.name !== "action" && onSort(column.name)}
                sx={{ backgroundColor: "#b3f6a9" }}
            >
                {column.label || column.name}
            </TableCell>
        ));
    };

    return (
        <TableRow>
            {renderTableHeaderCells([...columns, ...optionalColumns])}
            {showDeleteButton && (
                <TableCell sx={{ backgroundColor: "#b3f6a9" }}>
                    {t("tableHeaders.action")}
                </TableCell>
            )}
        </TableRow>
    );
};

export default TableHeader;