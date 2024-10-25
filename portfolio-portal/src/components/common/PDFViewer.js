import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const viewerStyles = {
	width: '100%',
	padding: '10px',
	overflowY: 'auto',
};

const PDFViewer = ({ fileUrl, workerUrl }) => {
	return (
		<Worker workerUrl={workerUrl}>
			<div style={viewerStyles}>
				<Viewer fileUrl={fileUrl} />
			</div>
		</Worker>
	);
};

export default PDFViewer;