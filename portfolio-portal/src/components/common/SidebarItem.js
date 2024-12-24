import React from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import PropTypes from 'prop-types';

const SidebarItem = ({ text, icon, route, onClick }) => (
    <ListItem button onClick={() => onClick(route)} disablePadding>
        <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
);

SidebarItem.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    route: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SidebarItem;
