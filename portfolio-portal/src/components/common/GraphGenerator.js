import React, {useState} from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import {API_FLASK_BASE_URL, GENERATE_GRAPH_BLOOD_PRESSURE} from '../../constants/ApiConstants';
import {GRAPH_FILE_NAME, SLASH} from '../../constants/AppConstants';
import GraphDisplay from './../../components/common/GraphDisplay';
import ExcelPreview from './../../components/common/ExcelPreview';
import './../../assets/css/graph-generator.css';
import csvFile from './../../assets/csv/blood_pressure_data.csv';

const ERROR_MESSAGES = {
    FILE_REQUIRED: 'Please upload a file first!',
    GRAPH_GENERATION_ERROR: 'Error generating graph. Please try again.',
};

const GraphGenerator = () => {
    const [file, setFile] = useState(null);
    const [graphImage, setGraphImage] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [excelData, setExcelData] = useState([]);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setErrorMessage('');

        if (uploadedFile) {
            readExcelFile(uploadedFile);
        }
    };

    const readExcelFile = (uploadedFile) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setExcelData(jsonData);
        };
        reader.readAsBinaryString(uploadedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            handleError(ERROR_MESSAGES.FILE_REQUIRED);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        resetError();

        try {
            const url = API_FLASK_BASE_URL + SLASH + GENERATE_GRAPH_BLOOD_PRESSURE;
            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            setGraphImage(createImageUrl(response.data));
            setDownloadLink(createImageUrl(response.data));
        } catch (error) {
            console.error('Error generating graph:', error);
            handleError(ERROR_MESSAGES.GRAPH_GENERATION_ERROR);
        } finally {
            setLoading(false);
        }
    };

    const createImageUrl = (data) => {
        const imageBlob = new Blob([data], { type: 'image/png' });
        return URL.createObjectURL(imageBlob);
    };

    const handleError = (message) => {
        setErrorMessage(message);
    };

    const resetError = () => {
        setErrorMessage('');
    };

    return (
        <div className="graph-generator-container">
            <h1>Generate Blood Pressure Graph</h1>
            <Form onFileChange={handleFileChange} onSubmit={handleSubmit} loading={loading} />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <div className="excel-preview-container">
                {excelData.length > 0 && <ExcelPreview data={excelData} />}
            </div>
            {graphImage && (
                <GraphDisplay
                    imageUrl={graphImage}
                    downloadLink={downloadLink || GRAPH_FILE_NAME}
                    altText="Blood Pressure Graph"
                    buttonText="Download Your Graph"
                    style={{ textAlign: 'center' }}
                />
            )}
            {/* Example file download link */}
            <div className="example-file-download">
                <p>Need an example? <a href={csvFile} download="blood_pressure_data.csv">Download example file</a></p>
            </div>
        </div>
    );
};

const Form = ({ onFileChange, onSubmit, loading }) => (
    <form onSubmit={onSubmit} className="graph-generator-form">
        <label htmlFor="file-upload" className="file-upload-label">
            Upload File:
        </label>
        <input
            type="file"
            id="file-upload"
            onChange={onFileChange}
            accept=".csv, .xls, .xlsx"
            className="file-upload-input"
        />
        <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Generate Graph'}
        </button>
    </form>
);

const ErrorMessage = ({ message }) => <p className="error-message">{message}</p>;

export default GraphGenerator;
