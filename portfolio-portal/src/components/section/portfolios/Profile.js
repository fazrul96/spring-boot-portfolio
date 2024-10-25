import React, { useState } from 'react';
import { Button, Box, Tabs, Tab, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';
import PDFViewer from '../../../components/common/PDFViewer';
import { downloadFile } from '../../../utils/downloadFile';
import { PDF_WORKER_URL, PROFILE_TABS } from '../../../constants/AppConstants';

// Externalize modal dialog styles for reuse
const modalDialogStyles = {
	paddingTop: '50px',
	paddingLeft: '10px',
	paddingRight: '10px',
};

// Profile Component
const Profile = ({
	modalId = 'resume',
	modalTitle = 'Career Profile',
	downloadLabel = 'Download',
	tabs=PROFILE_TABS,
	workerUrl = PDF_WORKER_URL
}) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const handleDownload = () => {
		const { fileUrl, fileName } = tabs[activeTab];
		if (fileUrl && fileName) {
			downloadFile(fileUrl, fileName);
		} else {
			alert('No file available for download');
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="resumeModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg" style={modalDialogStyles} role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="resumeModalLabel">{modalTitle}</h5>
							<Button onClick={handleDownload} disabled={!tabs[activeTab].fileUrl}>
								<Tooltip title={downloadLabel} arrow>
									<DownloadIcon />
								</Tooltip>
							</Button>
						</div>
						<div className="modal-body">
							<Tabs value={activeTab} onChange={handleTabChange} centered>
								{tabs.map((tab, index) => (
									<Tab key={index} label={tab.label} />
								))}
							</Tabs>

							{/* Display optional description */}
							{tabs[activeTab].description && (
								<Typography variant="body2" sx={{ margin: '10px 0' }}>
									{tabs[activeTab].description}
								</Typography>
							)}

							{/* Render PDFViewer */}
							<PDFViewer
								fileUrl={tabs[activeTab].fileUrl}
								workerUrl={workerUrl}
							/>
						</div>
					</div>
				</div>
			</div>
		</Box>
	);
};

export default Profile;