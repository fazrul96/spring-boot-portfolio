export const APP_NAME = "Portfolio";
export const APP_REGION = "MY";
export const DRAWER_WIDTH = 240;

export const PUBLIC_PAGES = ['Component', 'Medium', 'Module'];
export const PRIVATE_PAGES = ['Storage', 'OpenApi', 'Webtoon'];
export const GENERAL_SETTINGS = ['Profile', 'Settings'];

export const AUTH0_LOGIN_URL = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH0_AUTHORIZATION}`;

export const RESUME_FILE_NAME = process.env.REACT_APP_RESUME_FILE_NAME || 'CV_2024.pdf';
export const RESUME_URL = process.env.REACT_APP_RESUME_URL || `${process.env.PUBLIC_URL}/resume.pdf`;
export const PDF_WORKER_URL = process.env.REACT_APP_PDF_WORKER_URL || 'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js';

export const DEFAULT_IMAGE = 'https://wallpapercave.com/wp/wp2708351.jpg';
export const STATUS_COLOR = {
    Completed: 'green',
    InProgress: '#FFB81C',
};
export const GITHUB_URL = 'https://github.com/fazrul96';