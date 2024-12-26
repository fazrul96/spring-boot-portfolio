import React from 'react';

const statusStyles = {
    completed: { color: 'green' },
    testing: { color: '#b8860b' },
    development: { color: 'blue' },
    pending: { color: 'red' },
};

const CardStatus = ({ status }) => {
    const statusStyle = statusStyles[status.toLowerCase()] || {};
    return (
        <span style={statusStyle}>
            {status}
        </span>
    );
};

export default CardStatus;
