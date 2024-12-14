import {useState} from 'react';
import {Chip, Dialog, DialogContent, Paper, Stack, Typography} from '@mui/material';
import CardItem from './CardItem';

const ChipList = ({ title, data }) => {
	const [open, setOpen] = useState(false);
	const [selectedChip, setSelectedChip] = useState(null);

	// Function to handle chip click
	const handleChipClick = (chip) => {
		setSelectedChip(chip);
		setOpen(true);
	};

	// Function to handle modal close
	const handleClose = () => {
		setOpen(false);
		setSelectedChip(null);
	};

	// Render chips with hover effects
	const renderChips = () => {
		return data.map((entry, index) => (
			<Chip
				key={index}
				variant="outlined"
				label={entry.label}
				onClick={() => handleChipClick(entry)}
				sx={chipStyles}
			/>
		));
	};

	// Styles for chips and Paper component
	const chipStyles = {
		backgroundColor: '#f5f5f5',
		color: '#333',
		'&:hover': {
			backgroundColor: '#e0e0e0',
			transform: 'scale(1.05)',
			transition: 'background-color 0.3s, transform 0.3s',
		},
	};

	const paperStyles = {
		padding: 2,
		backgroundColor: '#f5f5f5', // Use a subtle background color
		'&:hover': {
            backgroundColor: '#e0e0e0',
            transform: 'scale(1.02)',
            transition: 'transform 0.2s, background-color 0.2s',
        },
	};

	return (
		<Paper elevation={3} sx={paperStyles}>
			<Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
				{title}
			</Typography>
			<Stack
				direction="row"
				spacing={1}
				flexWrap="wrap"
				justifyContent="center"
				sx={{
					mt: 2,
					px: { xs: 2, sm: 4 },
					py: { xs: 1, sm: 2 },
				}}
			>
				{renderChips()}
			</Stack>

			<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogContent>
					{selectedChip ? (
						<CardItem label={selectedChip.label} value={selectedChip.value} />
					) : (
						<p>No details available.</p>
					)}
				</DialogContent>
			</Dialog>
		</Paper>
	);
};

export default ChipList;