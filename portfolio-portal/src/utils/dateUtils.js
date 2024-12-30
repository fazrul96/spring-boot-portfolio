import {format, isValid} from 'date-fns';

/**
 * Utility function to format the date from an object.
 * The input object should contain a `date` property that represents a valid date.
 *
 * @param {Object} user - The object containing a `date` property.
 * @returns {string} - The formatted date in 'dd-MM-yyyy' format.
 * @throws {Error} - Throws an error if the input is invalid or the date is in an incorrect format.
 */
export const formatDate = (item) => {
    if (!item || !item.date) {
        return item;
    }

    const date = new Date(item.date);

    if (!isValid(date)) {
        throw new Error('The date format is invalid');
    }
    return format(date, 'dd-MMM-yyyy');
};
