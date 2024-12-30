export const APP_NAME = "Portfolio";
export const APP_REGION = "MY";
export const DRAWER_WIDTH = 240;
export const BACKGROUND_IMAGE = 'https://wallpapercave.com/wp/wp2708351.jpg';

export const PUBLIC_PAGES = ['Component', 'Medium', 'Module', 'Mosque'];
export const PRIVATE_PAGES = ['Storage', 'OpenApi', 'Webtoon'];
export const GENERAL_SETTINGS = ['Profile', 'Settings'];

export const AUTH0_LOGIN_URL = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH0_AUTHORIZATION}`;

export const CV_URL = process.env.REACT_APP_CV_URL || `${process.env.PUBLIC_URL}/cv.pdf`;
export const SNAPSYNCH_URL = process.env.REACT_APP_SNAPSYNCH_URL || `${process.env.PUBLIC_URL}/snapSynch.pdf`;
export const CV_FILE_NAME = process.env.REACT_APP_CV_FILE_NAME || 'CV.pdf';
export const SNAPSYNCH_FILE_NAME = process.env.REACT_APP_SNAPSYNCH_FILE_NAME || 'SnapSynch.pdf';
// export const PDF_WORKER_URL = process.env.REACT_APP_PDF_WORKER_URL || 'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js';
export const PDF_WORKER_URL = process.env.REACT_APP_PDF_WORKER_URL || 'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js';
export const GRAPH_FILE_NAME = 'blood_pressure_graph.png';

export const API_BASE_URL_TEST = "https://spring-boot-app.mfzrl.cyou/api/v1";
export const SYNC_WEBTOON_URL = `${API_BASE_URL_TEST}/`;
export const SLASH = '/';
export const DASH = '-';
export const EMPTY_STRING = '';
export const SINGLE_SPACE = ' ';

export const PROFILE_TABS = [
	{
		label: 'CV',
		fileUrl: CV_URL,
		fileName: CV_FILE_NAME,
		description: '',
	},
	{
		label: 'SnapSynch',
		fileUrl: SNAPSYNCH_URL,
		fileName: SNAPSYNCH_FILE_NAME,
		description: '',
	},
];

export const DEFAULT_IMAGE = 'https://wallpapercave.com/wp/wp2708351.jpg';
export const STATUS_COLOR = {
    Completed: 'green',
    InProgress: '#FFB81C',
};
export const GITHUB_URL = 'https://github.com/fazrul96';

export const OCR_IMAGES = [
	{ id: 1, image: '/assets/img/ocrSample/sampleJpg.jpg', title: 'Sample JPG' },
	{ id: 2, image: '/assets/img/ocrSample/samplePng.png', title: 'Sample PNG' },
];

export const OCR_ERROR_MESSAGES = {
	NO_FILE: 'Please select a file for OCR processing.',
	PROCESS_FAILURE: 'OCR process failed. Please try again.',
};

export const VIEW_TYPES = { GRID: 'grid', LIST: 'list' };
export const SORT_OPTIONS = { NAME: 'name', SIZE: 'size', DATE: 'date' };
export const FILE_TYPE_FILTERS = { ALL: 'all', FILE: 'file', FOLDER: 'folder' };