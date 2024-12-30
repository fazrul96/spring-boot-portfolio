import {useState} from 'react';

const useTable = (data, fields, initialSortConfig) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState(initialSortConfig);

    const handleSort = (column) => {
        setSortConfig(prev => ({
            key: column,
            direction: prev.key === column && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredData = data
        .filter(item =>
            fields.some(field => {
                const fieldValue = item[field.name];
                if (typeof fieldValue === 'string') {
                    return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
                }
                if (typeof fieldValue === 'number') {
                    return fieldValue.toString().includes(searchQuery);
                }
                return false;
            })
        )
        .sort((a, b) => {
            const { key, direction } = sortConfig;
            let valueA = a[key], valueB = b[key];
            if (key === 'date') {
                valueA = new Date(a[key]);
                valueB = new Date(b[key]);
            }
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return direction === 'desc' ? valueB - valueA : valueA - valueB;
            }
            return direction === 'desc' ? (valueB > valueA ? 1 : -1) : (valueA > valueB ? 1 : -1);
        });

    return { filteredData };
};

export default useTable;
