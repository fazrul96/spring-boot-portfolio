import React from "react";
import { Button, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "../common/Alert";
import { getAgeFromNRIC, getTruncateAddress } from "../../utils/dataProcessingUtils";
import { getAgeColor } from "../../utils/uiUtils";
import { formatDate } from "../../utils/dateUtils";

const TableRowComponent = ({
                               item,
                               columns,
                               optionalColumns,
                               onOpenModal,
                               onAction,
                               t,
                               actionButtonText,
                               showDeleteButton
                           }) => {
    const date = item ? formatDate(item) : "N/A";
    const age = item?.nric ? getAgeFromNRIC(item.nric) : "N/A";
    const ageColor = age !== "N/A" ? getAgeColor(age) : "#d3d3d3";
    const status = item?.status || "N/A"; // Assuming status is a part of item

    const handleRowClick = () => {
        onOpenModal(item);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        const isConfirmed = await Alert.confirm(
            t("confirmation.delete.title"),
            t("confirmation.delete.text"),
            t
        );
        if (isConfirmed) {
            onAction(item.id);
        }
    };

    const renderTableCells = (columnsArray) => {
        return columnsArray.map((column) => {
            const value = item?.[column.name] ?? "N/A";
            return (
                <TableCell key={column.name}>
                    {renderCellContent(column, value)}
                </TableCell>
            );
        });
    };

    const renderCellContent = (column, value) => {
        if (value === undefined || value === null) {
            value = column.name === "address" ? "No Address Available" : "N/A";
        }

        if (column.name === "address") {
            value = getTruncateAddress(value);
        }

        if (column.name === "date") {
            value = date;
        }

        if (column.name === "age") {
            value = age;
        }

        if (column.format) {
            value = column.format(value);
        }

        if (column.truncate && typeof value === "string" && value.length > 30) {
            value = value.substring(0, 30) + "...";
        }

        return column.tooltip ? (
            <Tooltip title={value}>
                <span>{value}</span>
            </Tooltip>
        ) : (
            <Typography>{value}</Typography>
        );
    };

    return (
        <TableRow
            key={item.id}
            hover
            onClick={handleRowClick}
            sx={{ backgroundColor: "#f9f9f9", borderLeft: `5px solid ${ageColor}` }}
        >
            {renderTableCells([...columns, ...optionalColumns])}
            {showDeleteButton && (
                <TableCell>
                    <Tooltip title={actionButtonText}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={(e) => handleDelete(e)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                </TableCell>
            )}
        </TableRow>
    );
};

export default TableRowComponent;
