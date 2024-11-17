import React from 'react';
import { Grid, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import FileActions from './FileActions';
import { getFileIcon, isFolder } from './utils';

const FileList = ({ files, onDownload, onDelete, onFolderClick }) => (
    <Grid container spacing={2}>
        {files.length ? (
            files.map((file, index) => (
                <Grid item xs={12} key={index}>
                    <ListItem
                        button={isFolder(file)}
                        onClick={() => isFolder(file) && onFolderClick(file)}
                        secondaryAction={
                            !isFolder(file) && (
                                <FileActions
                                    fileName={file.alias} // Use `file.name` for the file name
                                    onDownload={() => onDownload(file)} // Pass the entire `file` object if needed
                                    onDelete={() => onDelete(file)} // Pass the entire `file` object if needed
                                />
                            )
                        }
                    >
                        <ListItemIcon>{getFileIcon(file)}</ListItemIcon>
                        <ListItemText primary={file.alias} /> {/* Use `file.name` for display */}
                    </ListItem>
                </Grid>
            ))
        ) : (
            <Typography>No files in the bucket.</Typography>
        )}
    </Grid>
);

export default FileList;
