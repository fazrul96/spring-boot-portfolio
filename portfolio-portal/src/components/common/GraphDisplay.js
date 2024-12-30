import React from 'react';
import PropTypes from 'prop-types';

const GraphDisplay = ({ imageUrl, downloadLink, altText, buttonText, style }) => {
    return (
        <div style={style}>
            <h2>Generated Graph:</h2>
            <img src={imageUrl} alt={altText} style={{ maxWidth: '100%', height: 'auto' }} />
            <br />
            <a href={downloadLink} download>
                <button>{buttonText}</button>
            </a>
        </div>
    );
};

// Define prop types for better validation
GraphDisplay.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    downloadLink: PropTypes.string.isRequired,
    altText: PropTypes.string,
    buttonText: PropTypes.string,
    style: PropTypes.object,
};

// Define default props
GraphDisplay.defaultProps = {
    altText: 'Generated Graph',
    buttonText: 'Download Graph',
    style: {},
};

export default GraphDisplay;