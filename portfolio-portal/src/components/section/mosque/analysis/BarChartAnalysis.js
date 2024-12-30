import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import PropTypes from 'prop-types';
import CustomTooltip from "../CustomTooltip";
import {useTranslation} from "react-i18next";

const BarChartComponent = React.memo(({
                                          data,
                                          title,
                                          dataKey,
                                          labelKey,
                                          sortKey,
                                          maxItems = 5,
                                          isMobileBreakpoint = 600,
                                          processData,
                                          getBarColor
                                      }) => {
    const [chartData, setChartData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const { t } = useTranslation();

    // Handle window resize event
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < isMobileBreakpoint);
        };
        handleResize();  // Initialize on mount
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobileBreakpoint]);

    // Process the data for chart
    useEffect(() => {
        if (processData) {
            const processedData = processData(data);
            setChartData(processedData);
        }
    }, [data, processData]);

    const chartMargin = { top: 20, right: 20, left: 20, bottom: 20 };
    const barColor = "#8884d8";

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={labelKey}
                    label={!isMobile ? { value: title, position: 'bottom' } : null}
                    tick={{
                        fontSize: isMobile ? 10 : 12,
                        transform: isMobile ? 'scale(0.9)' : 'none',
                        fontFamily: 'Arial',
                    }}
                />
                <YAxis
                    label={
                        !isMobile
                            ? { value: t('analysis.donation.y-axis'), angle: -90, position: 'insideLeft', dy: +100 }
                            : null
                    }
                    tickFormatter={(tick) => tick.toLocaleString()}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <Tooltip content={<CustomTooltip title={title} />} />
                <Bar dataKey={dataKey} fill={barColor}>
                    <LabelList
                        dataKey={dataKey}
                        position="top"
                        formatter={(value) => value.toLocaleString()}
                        fontSize={isMobile ? 10 : 12}
                        fill="#000"
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
});

BarChartComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    sortKey: PropTypes.string.isRequired,
    maxItems: PropTypes.number,
    isMobileBreakpoint: PropTypes.number,
    processData: PropTypes.func.isRequired,
    getBarColor: PropTypes.func.isRequired,
};

const TopDonorsAnalysis = ({ data, t }) => {
    const processTopDonorsData = (data) => {
        // Sort data by donation amount and pick the top N donors
        const sortedData = [...data].sort((a, b) => b.donation - a.donation);
        return sortedData.slice(0, 5).map((donor) => ({
            name: donor.name,
            donation: donor.donation,
        }));
    };

    const getTopDonorColor = (entry) => {
        if (entry.donation > 10000) {
            return "#ff7300"; // High donation in orange
        } else if (entry.donation > 5000) {
            return "#387908"; // Medium donation in green
        } else {
            return "#8884d8"; // Low donation in default blue
        }
    };

    return (
        <BarChartComponent
            data={data}
            title={t('analysis.topDonors.x-axis')}
            dataKey="donation"
            labelKey="name"
            sortKey="donation"
            maxItems={5}
            processData={processTopDonorsData}
            getBarColor={getTopDonorColor}
            t={t}
        />
    );
};

const DonationAnalysis = ({ data }) => {
    const { t } = useTranslation();
    const processDonationData = (data) => {
        return data?.data.reduce((acc, user) => {
            const donationYear = new Date(user.date).getFullYear();
            const existingYearData = acc.find(item => item.donation_year === donationYear);

            if (existingYearData) {
                existingYearData.total_donations += user.donation;
            } else {
                acc.push({
                    donation_year: donationYear,
                    total_donations: user.donation,
                });
            }
            return acc;
        }, []);
    };

    const getDonationYearColor = (data) => {
        const year = data?.donation_year;
        if (typeof year !== 'number') {
            return "#387908";
        }

        switch (year) {
            case 2024:
                return "#ff7300";
            case 2023:
                return "#8884d8";
            case 2022:
                return "#387908";
            default:
                return "#387908";
        }
    };

    return (
        <BarChartComponent
            data={data}
            title={t('analysis.donation.x-axis')}
            dataKey="total_donations"
            labelKey="donation_year"
            sortKey="total_donations"
            maxItems={5}
            processData={processDonationData}
            getBarColor={getDonationYearColor}
            t={t}
        />
    );
};

const LogisticsAnalysis = ({ data, t }) => {
    const processLogisticsData = (data) => {
        return data?.data.reduce((acc, item) => {
            const status = item.status; // Available or In Use
            const existingStatusData = acc.find(itemData => itemData.status === status);

            if (existingStatusData) {
                existingStatusData.total_quantity += item.quantity;
            } else {
                acc.push({
                    status: status,
                    total_quantity: item.quantity
                });
            }

            return acc;
        }, []);
    };

    const getLogisticsColor = (entry) => {
        if (entry.status === "Available") {
            return "#387908"; // Green for Available
        } else if (entry.status === "In Use") {
            return "#ff7300"; // Orange for In Use
        } else {
            return "#8884d8"; // Default color
        }
    };

    return (
        <BarChartComponent
            data={data}
            title="Logistic"
            dataKey="total_quantity"
            labelKey="status"
            maxItems={5}
            processData={processLogisticsData}
            getBarColor={getLogisticsColor}
        />
    );
};

export { TopDonorsAnalysis, DonationAnalysis, LogisticsAnalysis };
