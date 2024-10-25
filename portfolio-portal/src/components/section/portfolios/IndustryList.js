import React from 'react';
import ChipList from '../../../components/common/ChipList';

const IndustryList = ({ industries }) => {
	return <ChipList title="Industries" data={industries} />;
};

export default IndustryList;