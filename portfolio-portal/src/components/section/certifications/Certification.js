import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import CertificationCard from '../../../components/section/certifications/CertificationCard';
import { API_BASE_URL, API_PUBLIC_URL } from './../../../constants/ApiConstants';

import ApiService from './../../../services/ApiService';
import { useAuth0 } from '@auth0/auth0-react';

const Certification = ({ certifications }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);  // New loading state
	const [error, setError] = useState(null);  // Error state

	const { getAccessTokenSilently } = useAuth0();

    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PUBLIC_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiService.fetchCertifications();
                setData(response);
            } catch (error) {
                setError('Failed to load data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();  // Trigger data fetching on component load
    }, [apiService]);

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
			<section id="certification">
		    {/*
		    <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
		        Certification
	        </h1>
	        <p className="portfolio-subheading">Here are my previous certifications</p> */}
			    <Grid container spacing={2} justifyContent="center" alignItems="center">
	                {loading ? (
	                    <p>Loading...</p>
	                ) : error ? (
	                    <p>{error}</p>
	                ) : (
	                    <>
	                        {data.map((certification, index) => (
		                        <Grid item xs={12} md={6} key={index}>
	                                <CertificationCard certification={certification} />
	                            </Grid>
	                        ))}
	                    </>
	                )}
			    </Grid>
			</section>
		</Box>
	);
};

export default Certification;