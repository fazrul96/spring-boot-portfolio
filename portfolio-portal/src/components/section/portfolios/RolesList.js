import React from 'react';
import ChipList from '../../../components/common/ChipList';

const RolesList = ({ roles }) => {
	return <ChipList title="Roles" data={roles} />;
};

export default RolesList;
