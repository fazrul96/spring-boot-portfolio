import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Divider, List, Toolbar} from '@mui/material';
import SidebarItem from "./common/SidebarItem";
import {privateSidebarItems, publicSidebarItems} from '../data/sidebarData';
import {useAuth0} from '@auth0/auth0-react';

const SidebarDrawer = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    const handleItemClick = (route) => {
        navigate(route);
    };
    return (
        <>
            <Toolbar />
            <Divider />
            <List>
                {/* Render public items */}
                {publicSidebarItems.map((item, index) => (
                    <SidebarItem
                        key={index}
                        text={item.text}
                        icon={item.icon}
                        route={item.route}
                        onClick={handleItemClick}
                    />
                ))}

                {isAuthenticated && <Divider />}
                {isAuthenticated &&
                    privateSidebarItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            text={item.text}
                            icon={item.icon}
                            route={item.route}
                            onClick={handleItemClick}
                        />
                    ))}
            </List>
            <Divider />
        </>
    );
};

export default SidebarDrawer;