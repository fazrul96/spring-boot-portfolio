import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

const StateCitySelector = ({ states, selectedState, setSelectedState, selectedCity, setSelectedCity, t }) => {
    return (
        <>
            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: 'primary.main' }}>{t('sections.prayerTimes.selectState')}</InputLabel>
                <Select
                    value={selectedState}
                    onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedCity(states[e.target.value][0]);
                    }}
                    label={t('sections.prayerTimes.state')}
                    sx={{
                        borderRadius: 3,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    }}
                >
                    {Object.keys(states).map((stateOption, index) => (
                        <MenuItem key={index} value={stateOption}>{stateOption}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: 'primary.main' }}>{t('sections.prayerTimes.selectCity')}</InputLabel>
                <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    label={t('sections.prayerTimes.city')}
                    sx={{
                        borderRadius: 3,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    }}
                >
                    {states[selectedState].map((cityOption, index) => (
                        <MenuItem key={index} value={cityOption}>{cityOption}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default StateCitySelector;
