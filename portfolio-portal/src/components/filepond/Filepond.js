import React, {useEffect, useRef, useState} from "react";
import {FilePond, registerPlugin} from "react-filepond";
import {useAuth0} from "@auth0/auth0-react"; // Import Auth0 hook
import {API_BASE_URL, API_PRIVATE_URL, MINIO_UPLOAD_FILES} from '../../constants/ApiConstants';
import ApiService from './../../services/ApiService'; // Assuming this is a helper for API calls
import "filepond/dist/filepond.min.css"; // FilePond styles
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';

// Register FilePond plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageEdit,
    FilePondPluginImageTransform
);

const Filepond = () => {
    const { getAccessTokenSilently } = useAuth0(); // Retrieve Auth0 hook for token
    const pondRef = useRef(null); // UseRef to store FilePond reference
    const [files, setFiles] = useState([]); // Store file data
    const [uploading, setUploading] = useState(false); // Track uploading status
    const [error, setError] = useState(null); // Handle error

    // Initialize ApiService (assuming it handles API calls)
    const apiService = new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently);

    useEffect(() => {
        console.log("FilePond instance initialized.");
    }, []);

    // Handle file upload
    const handleFileUpload = async () => {
        if (files.length === 0) {
            alert("No files selected.");
            return;
        }

        setUploading(true);
        const formData = new FormData();

        // Debug: Log files before appending them to FormData
        console.log("Files before appending to FormData:", files);

        files.forEach((file) => {
            console.log("Appending file to FormData:", file);  // Log file data
            formData.append("files", file);  // Make sure the key matches what your API expects
        });

        try {
            const accessToken = await getAccessTokenSilently();
            console.log("Access Token:", accessToken);  // Debug: Ensure the token is being fetched

            // Call the upload API (ensure correct headers and endpoint)
            const response = await apiService.createResource(
                MINIO_UPLOAD_FILES,
                formData,
                true,
                { Authorization: `Bearer ${accessToken}` }
            );
            console.log("File upload response:", response);
        } catch (error) {
            console.error("Error uploading files:", error);
            setError("Error uploading files");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <FilePond
                ref={pondRef}
                files={files}
                allowMultiple={true}
                onUpdateFiles={(fileItems) => {
                    console.log("Updated files:", fileItems); // Debug: Log updated fileItems
                    setFiles(fileItems.map(fileItem => fileItem.file));
                }}
                disabled={uploading}
            />
            <button onClick={handleFileUpload} disabled={uploading}>Upload Files</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Filepond;
