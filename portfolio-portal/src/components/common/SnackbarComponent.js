import {Snackbar} from '@mui/material';

const SnackbarComponent = ({ open, message, onClose }) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
    />
);

export default SnackbarComponent;
