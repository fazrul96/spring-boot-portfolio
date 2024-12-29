import React, {useState} from 'react';
import {PDF_WORKER_URL, PROFILE_TABS} from "../../../constants/AppConstants";
import {downloadFile} from "../../../utils/downloadFile";
import ProfileModal from "../../modal/ProfileModal";

const Profile = ({
					 modalId = 'resume',
					 modalTitle = 'Career Profile',
					 tabs = PROFILE_TABS,
					 workerUrl = PDF_WORKER_URL,
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
		<ProfileModal
			modalId={modalId}
			modalTitle={modalTitle}
			tabs={tabs}
			activeTab={activeTab}
			handleTabChange={handleTabChange}
			handleDownload={handleDownload}
			workerUrl={workerUrl}
		/>
	);
};

export default Profile;