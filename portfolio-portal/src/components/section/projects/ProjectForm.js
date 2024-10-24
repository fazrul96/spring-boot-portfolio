import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import TextInput from '../../../components/common/TextInput';
import TagSelector from '../../../components/common/TagSelector';
import StatusSelector from '../../../components/common/StatusSelector';

const availableTags = [
    'Web Development',
    'PHP',
    'Laravel',
    'Java',
    'React',
    'Game Development',
    'Unity',
    'C#',
    'Python',
    'API',
    'AWS',
    'Javascript',
    'Typescript',
    'Cucumber'
];
const availableStatuses = [
    'Not Started',
    'Still in development',
    'Completed',
    'On Hold',
];
const ProjectForm = ({ open, onClose, project, onInputChange, onSubmit }) => {
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [selectedStatus, setSelectedStatus] = React.useState('');

    useEffect(() => {
        // Update local state when project prop changes
        if (project) {
            setSelectedTags(project.tag?.split('|') || []);
            setSelectedStatus(project.status || '');
        }
    }, [project]);

    const handleTagChange = (event) => {
        const value = event.target.value;
        setSelectedTags(value);
        onInputChange({ target: { name: 'tag', value: value.join('|') } });
    };

    const handleStatusChange = (event) => {
        const value = event.target.value;
        setSelectedStatus(value);
        onInputChange({ target: { name: 'status', value } });
    };

    const renderTextInputs = () => {
        const fields = [
            { name: 'title', label: 'Title', required: true },
            { name: 'description', label: 'Description', required: true },
            { name: 'reference', label: 'Reference' },
            { name: 'img', label: 'Img' },
            { name: 'list', label: 'List' },
        ];

        return fields.map(({ name, label, required }) => (
            <TextInput
                key={name}
                name={name}
                label={label}
                value={project?.[name] || ''}
                onChange={onInputChange}
                required={required}
            />
        ));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{project?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogContent>
                {renderTextInputs()}
                <StatusSelector
                    status={selectedStatus}
                    availableStatuses={availableStatuses}
                    onStatusChange={handleStatusChange}
                />
                <TagSelector
                    tags={selectedTags}
                    availableTags={availableTags}
                    onTagChange={handleTagChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectForm;