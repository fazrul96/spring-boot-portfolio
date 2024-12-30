import React from 'react';
import ChipList from '../../../components/common/ChipList';

const SkillsList = ({ skills }) => {
	return <ChipList title="Skills" data={skills} />;
};

export default SkillsList;