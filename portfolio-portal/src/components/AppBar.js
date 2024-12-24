import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Box, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth0 } from '@auth0/auth0-react';
import ReactCountryFlag from 'react-country-flag';

import NavigationMenu from './NavigationMenu';
import UserMenu from './UserMenu';

import { APP_NAME, APP_REGION, DRAWER_WIDTH, BACKGROUND_IMAGE } from '../constants/AppConstants';

const ResponsiveAppBar = () => {
	const { user, isAuthenticated } = useAuth0();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// Handlers for opening/closing menus
	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
	const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
	const handleCloseNavMenu = () => setAnchorElNav(null);
	const handleCloseUserMenu = () => setAnchorElUser(null);

	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
				ml: { sm: `${DRAWER_WIDTH}px` },
				zIndex: (theme) => theme.zIndex.drawer + 1,
				backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url("${BACKGROUND_IMAGE}")`,
				backgroundSize: 'cover',
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					{/* App Logo */}
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '2rem', color: 'white' }} />
						<Typography
							variant="h6"
							noWrap
							component={Link}
							to="/"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'white',
								textDecoration: 'none'
							}}
						>
							{APP_NAME}
						</Typography>
					</Box>

					{/* Mobile Menu Button */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="open navigation"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
					</Box>

					{/* Mobile Logo */}
					<Typography
						variant="h5"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						{APP_NAME}
					</Typography>

					{/* Navigation Menu (Desktop & Mobile) */}
					<NavigationMenu
						anchorElNav={anchorElNav}
						handleCloseNavMenu={handleCloseNavMenu}
					/>

					{/* User Menu & Flag */}
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<div>
								{isAuthenticated && (
									<ReactCountryFlag
										countryCode={APP_REGION}
										svg
										title={APP_REGION}
										style={{
											width: '2em',
											height: '2em',
											marginRight: '8px',
										}}
									/>
								)}
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									{isAuthenticated ? (
										<Avatar alt={user.name} src={user.picture} />
									) : (
										<Avatar alt="Unknown" />
									)}
								</IconButton>
							</div>
						</Tooltip>

						<UserMenu
							anchorElUser={anchorElUser}
							handleCloseUserMenu={handleCloseUserMenu}
						/>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default ResponsiveAppBar;
