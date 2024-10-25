import React from 'react';
import { Tooltip, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { UserCard } from 'react-ui-cards';

const ProfileCard = ({ profileImage }) => {
	return (
		<Grid item>
		    <UserCard
			    float
			    header={profileImage}
			    avatar={profileImage}
			    name='Fazrul Romli'
			    positionName='Software Developer'
		        stats={[
			        {
			            value: (
			                <Tooltip title="LinkedIn" arrow>
				                <a href="https://www.linkedin.com/in/fazrul-romli-79138415b/" target="_blank" rel="noopener noreferrer">
				                    <LinkedInIcon />
				                </a>
				            </Tooltip>
				        )
			        },
			        {
			            value: (
				            <Tooltip title="GitHub" arrow>
					            <a href="https://github.com/fazrul96" target="_blank" rel="noopener noreferrer">
					                <GitHubIcon />
					            </a>
				            </Tooltip>
			        )
			            },
			        {
				        value: (
				            <Tooltip title="Email" arrow>
					            <a href="mailto:mfazrul07@gmail.com">
					                <EmailIcon />
					            </a>
				            </Tooltip>
				        )
			        },
			        {
				        value: (
				            <Tooltip title="Open Resume" placement="top" arrow>
					            <a className="portfolio-button" data-toggle="modal" data-target="#resume">
					                <AssignmentIndIcon />
					            </a>
				            </Tooltip>
				        )
			        }
		        ]}
		    />
		</Grid>
	);
};

export default ProfileCard;