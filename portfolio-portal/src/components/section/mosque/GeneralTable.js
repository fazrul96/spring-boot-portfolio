import React from "react";
import {Card, Grid, Paper, Table, TableBody, TableContainer} from "@mui/material";
import SearchBar from "../../common/SearchBar";
import TableHeader from "../../common/TableHeader";
import TableRowComponent from "../../common/TableRow";

const GeneralTable = ({
                          data,
                          columns,
                          optionalColumns = [],
                          searchQuery,
                          onSearchChange,
                          onSort,
                          onAction,
                          onOpenModal,
                          t,
                          actionButtonText
                      }) => {
    const renderTableRows = () => {
        return data.map((item) => (
            <TableRowComponent
                key={item.id}
                item={item}
                columns={columns}
                optionalColumns={optionalColumns}
                onOpenModal={onOpenModal}
                onAction={onAction}
                actionButtonText={actionButtonText}
                showDeleteButton={true}
                t={t}
            />
        ));
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} t={t} />
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHeader
                                columns={columns}
                                optionalColumns={optionalColumns}
                                onSort={onSort}
                                showDeleteButton={true}
                                t={t}
                            />
                            <TableBody>
                                {renderTableRows()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Grid>
    );
};

export default GeneralTable;
