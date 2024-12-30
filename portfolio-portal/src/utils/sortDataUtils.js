export const sortData = (data, sortBy, direction = 'asc') => {
    return data.sort((a, b) => {
        let valueA = a[sortBy] || ''; // Use an empty string as fallback if field is missing
        let valueB = b[sortBy] || '';

        // Handle 'date' field separately (if the field contains date strings)
        if (sortBy === 'date') {
            valueA = new Date(valueA);
            valueB = new Date(valueB);
        }
        // Handle string fields (case-insensitive comparison)
        else if (typeof valueA === 'string' && typeof valueB === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }
        // Handle number fields
        else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return direction === 'asc' ? valueA - valueB : valueB - valueA;
        }

        // Default sorting for other types (strings, numbers, etc.)
        return direction === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
    });
};
