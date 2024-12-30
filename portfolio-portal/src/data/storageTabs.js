import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import GDrive from './../components/storage/GDrive';
import DropBox from './../components/storage/DropBox';
import MinIo from './../components/storage/MinIo';

export const STORAGE_TABS = [
    { label: 'GDrive', icon: <AddToDriveIcon />, component: <GDrive />, value: 'gdrive' },
    { label: 'DropBox', icon: <DriveFolderUploadIcon />, component: <DropBox />, value: 'dropbox' },
    { label: 'MinIo', icon: <DriveFolderUploadIcon />, component: <MinIo />, value: 'minio' },
];
