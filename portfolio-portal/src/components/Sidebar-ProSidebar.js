import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const CustomSidebar = () => {
  return (
    <Sidebar>
      <Menu>
        <SubMenu title="Charts">
          <MenuItem> <Link to="/pie-charts">Pie charts</Link> </MenuItem>
          <MenuItem> <Link to="/line-charts">Line charts</Link> </MenuItem>
        </SubMenu>
        <MenuItem> <Link to="/documentation">Documentation</Link> </MenuItem>
        <MenuItem> <Link to="/calendar">Calendar</Link> </MenuItem>
      </Menu>
    </Sidebar>
  );
};

//export default CustomSidebar;
