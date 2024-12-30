import React from 'react';

const ExcelPreview = ({ data }) => {
    return (
        <div>
            <h2>Excel Preview:</h2>
            <table border="1">
                <thead>
                    <tr>
                        {data[0].map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelPreview;
