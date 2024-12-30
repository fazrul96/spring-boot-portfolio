import ZipIcon from '@mui/icons-material/Archive';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const isFolder = (item) => item.type === 'folder';

export const getFileIcon = (item) => {
    if (item.extension === 'zip') {
        return <ZipIcon fontSize="large" sx={{ color: 'info.main' }} />;
    } else if (isFolder(item)) {
        return <FolderIcon fontSize="large" sx={{ color: 'warning.main' }} />;
    } else {
        return <InsertDriveFileIcon fontSize="large" sx={{ color: 'text.secondary' }} />;
    }
};