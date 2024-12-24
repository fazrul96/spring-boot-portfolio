import OCRPage from '../pages/OCRPage';
import CalendarPage from "../pages/CalendarPage";
import { Typography } from '@mui/material';

export const cardData = [
	{
		title: 'Optical Character Recognition',
		category: 'Module',
		image: 'https://wallpapercave.com/wp/wp2708351.jpg',
		content: <OCRPage />,
		tag: 'ocr',
		details: (
	        <Typography variant="body2" color="text.secondary">
		        Optical character recognition or optical character reader (OCR) is the electronic or mechanical conversion of images of typed, handwritten or printed text into machine-encoded text...
		    </Typography>
		),
	},
	{
		title: 'Calendar',
		category: 'Module',
		image: 'https://wallpapercave.com/wp/wp2708351.jpg',
		content: <CalendarPage />,
		tag: 'calendar',
		details: (
	        <Typography variant="body2" color="text.secondary">
		        Our Calendar component offers intuitive scheduling capabilities, allowing users to manage events, appointments, and tasks effortlessly...
		    </Typography>
		),
	},
];