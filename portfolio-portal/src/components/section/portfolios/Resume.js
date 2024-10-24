import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Button, Box, Grid } from '@mui/material';
import { RESUME_FILE_NAME, RESUME_URL, PDF_WORKER_URL } from './../../../constants/AppConstants';

const viewerStyles = {
    width: '100%',
    padding: '10px',
    overflowY: 'auto',
};

const modalDialogStyles = {
    paddingTop: '50px',
    paddingLeft: '10px',
    paddingRight: '10px',
};

const Resume = ({ modalId = 'resume', modalTitle = 'RESUME', downloadLabel = 'Download Resume' }) => {
	const handleDownload = () => {
        const link = document.createElement('a');
        link.href = RESUME_URL;
        link.setAttribute('download', RESUME_FILE_NAME);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

	return (
		<Box sx={{ flexGrow: 1 }}>
			<div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="resumeModalLabel" aria-hidden="true">
			    <div className="modal-dialog modal-lg" style={modalDialogStyles} role="document">
			        <div className="modal-content">
				        <div className="modal-header">
			                <h5 className="modal-title" id="resumeModalLabel">{modalTitle}</h5>
				            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDownload}
                                style={{ marginLeft: 'auto' }}
                            >
                                {downloadLabel}
                            </Button>
				        </div>
				        <div className="modal-body">
							<Worker workerUrl={PDF_WORKER_URL}>
		                        <div style={viewerStyles}>
		                            <Viewer fileUrl={RESUME_URL} />
		                        </div>
		                    </Worker>
				        </div>
		            </div>
			    </div>
			</div>
		</Box>
	);
};

export default Resume;