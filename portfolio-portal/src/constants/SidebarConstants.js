import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectIcon from '@mui/icons-material/Build';
import MediumIcon from '@mui/icons-material/Book';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BackupIcon from '@mui/icons-material/Backup';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import OpenAPIIcon from '@mui/icons-material/Api';

export const SIDEBAR_TEXT = {
    public: {
        dashboard: 'Dashboard',
        component: 'Component',
        medium: 'Medium',
        module: 'Module',
        mosque: 'Mosque',
    },
    private: {
        webtoon: 'Webtoon',
        storage: 'Cloud Storage',
        openapi: 'OpenAPI',
    },
};

export const SIDEBAR_ICONS = {
    dashboard: <DashboardIcon />,
    component: <ProjectIcon />,
    medium: <MediumIcon />,
    module: <ViewModuleIcon />,
    mosque: <ViewModuleIcon />,
    webtoon: <MenuBookIcon />,
    storage: <BackupIcon />,
    openapi: <OpenAPIIcon />,
};
