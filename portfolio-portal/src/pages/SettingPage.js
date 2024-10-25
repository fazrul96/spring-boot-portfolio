import React, { useState } from 'react';
import {
	Box,
	Typography,
	Grid,
	Paper,
	Divider,
	Avatar,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel,
} from '@mui/material';

// Component for individual profile field
const ProfileField = ({ label, name, value, onChange, readOnly }) => (
	<Grid item xs={12} sm={6}>
		<TextField
		    fullWidth
		    label={label}
		    name={name}
		    value={value}
		    onChange={onChange}
		    variant="outlined"
		    margin="normal"
		    InputProps={{
		        readOnly,
		    }}
		/>
	</Grid>
);

// Component for skills selection
const SkillsSelect = ({ skills, onChange, readOnly }) => (
	<Grid item xs={12} sm={6}>
		<FormControl fullWidth variant="outlined" margin="normal">
	        <InputLabel>Skills</InputLabel>
	        <Select
		        multiple
		        value={skills}
		        onChange={onChange}
		        renderValue={(selected) => selected.join(', ')}
		        inputProps={{
		            readOnly,
		        }}
		    >
			    {['JavaScript', 'React', 'Node.js', 'Material-UI', 'CSS', 'HTML'].map((skill) => (
		            <MenuItem key={skill} value={skill}>
			            <Checkbox checked={skills.indexOf(skill) > -1} />
			            {skill}
			        </MenuItem>
			    ))}
		    </Select>
		</FormControl>
	</Grid>
);

// Main settings component
const SettingPage = () => {
	const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
	const [isEditing, setIsEditing] = useState(false);
	const [profileInfo, setProfileInfo] = useState({
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1234567890',
		location: 'New York, USA',
		skills: ['JavaScript', 'React'],
		role: 'Full Stack Developer',
	});

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
	        const reader = new FileReader();
		    reader.onloadend = () => {
		        setProfileImage(reader.result);
		    };
		    reader.readAsDataURL(file);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setProfileInfo((prevInfo) => ({
	        ...prevInfo,
		    [name]: value,
		}));
	};

	const handleSkillsChange = (event) => {
		const skillsArray = event.target.value;
		setProfileInfo((prevInfo) => ({ ...prevInfo, skills: skillsArray }));
	};

	const toggleEdit = () => {
		setIsEditing((prev) => !prev);
	};

	return (
		<Box sx={{ flexGrow: 1, padding: 4, marginTop: '70px',  }}>
	        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
			    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
		            Profile Information
			    </Typography>
			    <Divider sx={{ marginBottom: 2 }} />

			    <Grid container spacing={3} alignItems="center">
		            <Grid item xs={12} sm={12} container justifyContent="center">
                        <Button
	                        component="label"
	                        sx={{
	                            padding: 0,
	                            backgroundColor: 'transparent',
	                            '&:hover': { backgroundColor: 'transparent' },
	                        }}
                        >
	                        <Avatar
	                            alt="Profile Picture"
	                            src={profileImage}
	                            sx={{ width: 120, height: 120, border: '2px solid #1976d2' }}
	                        />
	                        <input
	                            type="file"
	                            hidden
	                            accept="image/*"
	                            onChange={handleImageChange}
	                        />
                        </Button>
                    </Grid>

			      {/* Using ProfileField component for individual fields */}
	                {[
		                { label: 'Name', name: 'name' },
			            { label: 'Email', name: 'email' },
			            { label: 'Phone', name: 'phone' },
			            { label: 'Location', name: 'location' },
			            { label: 'Role', name: 'role' },
		            ].map((field) => (
			            <ProfileField
				            key={field.name}
				            label={field.label}
				            name={field.name}
				            value={profileInfo[field.name]}
				            onChange={handleInputChange}
				            readOnly={!isEditing}
				        />
			        ))}

		            {/* Using SkillsSelect component for skills */}
	                <SkillsSelect
			            skills={profileInfo.skills}
			            onChange={handleSkillsChange}
			            readOnly={!isEditing}
		            />
			    </Grid>

			    {/* Edit Toggle */}
		        <FormControlLabel
			        control={<Checkbox checked={isEditing} onChange={toggleEdit} />}
			        label="Edit Mode"
			        sx={{ marginTop: 2 }}
			    />
			    {isEditing && (
			        <Button
			            variant="contained"
			            color="primary"
			            onClick={() => alert('Profile updated!')}
			            sx={{ marginTop: 2 }}
			        >
			            Save Changes
			        </Button>
			    )}
		    </Paper>
		</Box>
	);
};

export default SettingPage;