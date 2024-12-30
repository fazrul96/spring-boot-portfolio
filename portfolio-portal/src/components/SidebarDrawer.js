import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Collapse, Divider, List, Toolbar} from '@mui/material';
import SidebarItem from './common/SidebarItem';
import {privateSidebarItems, publicSidebarItems} from '../data/sidebarData';
import {useAuth0} from '@auth0/auth0-react';

const SidebarDrawer = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    const [openStates, setOpenStates] = useState({});

    const handleItemClick = (route) => {
        navigate(route);
    };

    const handleToggle = (item) => {
        setOpenStates((prevStates) => ({
            ...prevStates,
            [item]: !prevStates[item],
        }));
    };

    const renderSidebarItems = (items) => {
        return items.map((item, index) => (
            <React.Fragment key={index}>
                {/* Render the parent item */}
                <SidebarItem
                    text={item.text}
                    icon={item.icon}
                    route={item.route}
                    onClick={handleItemClick}
                    isParent={!!item.children}  // Mark item as a parent if it has children
                    onToggle={() => handleToggle(item.text)}  // Handle toggle for parent items
                />

                {/* Render nested (child) items */}
                {item.children && (
                    <Collapse in={openStates[item.text] || false} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children.map((child, childIndex) => (
                                <SidebarItem
                                    key={childIndex}
                                    text={child.text}
                                    icon={child.icon}
                                    route={child.route}
                                    onClick={handleItemClick}
                                    isChild={true}  // Mark child items
                                />
                            ))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        ));
    };

    return (
        <>
            <Toolbar />
            <Divider />
            <List>
                {/* Render public sidebar items */}
                {renderSidebarItems(publicSidebarItems)}

                {isAuthenticated && <Divider />}

                {/* Render private sidebar items */}
                {isAuthenticated && renderSidebarItems(privateSidebarItems)}
            </List>
            <Divider />
        </>
    );
};

export default SidebarDrawer;
