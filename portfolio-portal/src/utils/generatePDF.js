import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Generates a PDF report for logistics or any other module.
 * @param {Object} options - The options for generating the PDF.
 * @param {Array} options.data - The data to include in the report.
 * @param {string} [options.title='Report'] - The title of the PDF.
 * @param {string} [options.fileName='report.pdf'] - The filename of the generated PDF.
 * @param {Array} options.columns - The columns for the table in the PDF.
 * @param {Array} options.columnNames - The column names corresponding to the data.
 * @param {Array} [options.sortedData] - Optional pre-sorted data (if sorting is already done outside).
 */
export const generatePDF = ({ data, title = 'Report', fileName = 'report.pdf', columns = [], columnNames = [], sortedData = null }) => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(title, 20, 20);
    doc.text('Generated on: ' + new Date().toLocaleString(), 20, 30);

    const tableData = sortedData || data;

    // Use autoTable to generate the table in the PDF
    doc.autoTable({
        startY: 40, // Start the table from Y position 40
        head: [columns], // Columns to display in the table header
        body: tableData.map(item => columnNames.map(col => item[col])), // Map data to table columns
    });

    // Save the generated PDF
    doc.save(fileName);
};
