import {Button, CircularProgress} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const DownloadButton = ({ isLoading, handleGeneratePDF, users, t }) => (
    <Button
        variant="contained"
        color="primary"
        onClick={() => handleGeneratePDF(users)}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
    >
        {isLoading ? t('loading.generatingReport') : t('buttons.download')}
    </Button>
);

export default DownloadButton;