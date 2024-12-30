import React from 'react';
import {Grid, IconButton, Tooltip} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {UserCard} from 'react-ui-cards';

const ProfileCard = ({ profileImage }) => {
	return (
		<Grid item xs={12} sm={6} md={4} container justifyContent="center">
			<UserCard
				float
				header={profileImage}
				avatar={profileImage}
				name="Fazrul Romli"
				positionName="Software Developer"
				stats={[
					{
						value: (
							<Tooltip title="LinkedIn" arrow>
								<IconButton
									component="a"
									href="https://www.linkedin.com/in/fazrul-romli-79138415b/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="LinkedIn"
									sx={{ color: '#0077b5', '&:hover': { color: '#0e76a8' } }}
								>
									<LinkedInIcon />
								</IconButton>
							</Tooltip>
						),
					},
					{
						value: (
							<Tooltip title="GitHub" arrow>
								<IconButton
									component="a"
									href="https://github.com/fazrul96"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="GitHub"
									sx={{ color: '#333', '&:hover': { color: '#181717' } }}
								>
									<GitHubIcon />
								</IconButton>
							</Tooltip>
						),
					},
					{
						value: (
							<Tooltip title="Email" arrow>
								<IconButton
									component="a"
									href="mailto:mfazrul07@gmail.com"
									aria-label="Email"
									sx={{ color: '#d14836', '&:hover': { color: '#f44336' } }}
								>
									<EmailIcon />
								</IconButton>
							</Tooltip>
						),
					},
					{
						value: (
							<Tooltip title="Open Resume" placement="top" arrow>
								<IconButton
									className="portfolio-button"
									aria-label="Resume"
									sx={{
										color: '#5f6368',
										'&:hover': { color: '#4caf50' },
									}}
									data-toggle="modal"
									data-target="#resume"
								>
									<AssignmentIndIcon />
								</IconButton>
							</Tooltip>
						),
					},
				]}
			/>
		</Grid>
	);
};

export default ProfileCard;
