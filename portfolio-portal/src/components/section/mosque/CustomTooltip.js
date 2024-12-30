import React from "react";

const CustomTooltip = ({ payload = [], label = '', title }) => {
    if (payload.length) {
        const donationAmount = payload[0].value;
        return (
            <div style = {{backgroundColor: '#fff', padding: '3px', border: '1px solid #ddd'}} >
                <p >{`${title}: ${label}`}</p >
                <p >{`Total: RM ${donationAmount.toLocaleString()}`}</p >
            </div >
        );
    }
    return null;
};

export default CustomTooltip;