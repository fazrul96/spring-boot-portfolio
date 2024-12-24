import React from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SidebarItem = ({ text, icon, route, onClick, isParent, onToggle, isChild, openState }) => {
    return (
        <ListItem
            button
            onClick={() => onClick(route)}
            disablePadding
            sx={{
                paddingLeft: isChild ? 5 : 2,
                backgroundColor: 'transparent',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            }}
        >
            <ListItemButton onClick={isParent ? onToggle : undefined}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
                {isParent && (openState ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItemButton>
        </ListItem>
    );
};

SidebarItem.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    route: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isParent: PropTypes.bool,
    onToggle: PropTypes.func,
    isChild: PropTypes.bool,
    openState: PropTypes.bool,
};

export default SidebarItem;
