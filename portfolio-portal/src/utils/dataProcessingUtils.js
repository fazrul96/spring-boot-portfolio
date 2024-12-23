/**
 * Function to calculate the age from NRIC.
 * @param {string} nric - The NRIC string (e.g., '990501123456').
 * @returns {number} - Calculated age based on NRIC.
 */
export const getAgeFromNRIC = (nric) => {
    const birthYear = parseInt(nric.substring(0, 2), 10);
    const birthMonth = parseInt(nric.substring(2, 4), 10);
    const birthDay = parseInt(nric.substring(4, 6), 10);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fullYear = birthYear >= 22 ? 1900 + birthYear : 2000 + birthYear;
    const birthDate = new Date(fullYear, birthMonth - 1, birthDay);

    return currentYear - fullYear - (currentDate < birthDate ? 1 : 0);
};

/**
 * Function to truncate the address to a specified length and add ellipsis.
 * @param {string} address - The full address string.
 * @param {number} maxLength - The maximum length of the truncated address.
 * @returns {string} - Truncated address with ellipsis if it exceeds the maxLength.
 */
export const getTruncateAddress = (address, maxLength = 30) => {
    return address.length > maxLength ? address.substring(0, maxLength) + "..." : address;
};

/**
 * Function to validate the NRIC format.
 * The NRIC should follow the format 'YYMMDD-XXXX' with exactly 12 digits.
 * @param {string} nric - The NRIC string (e.g., '990501-1234').
 * @returns {boolean} - Returns true if the NRIC is valid, false otherwise.
 */
export const validateNric = (nric) => {
    // Define the pattern for the NRIC: exactly 12 digits with a dash separating the last 4 digits
    const nricPattern = /^\d{6}-\d{4}$/;

    // Check if the NRIC matches the 'YYMMDD-XXXX' format
    if (!nricPattern.test(nric)) {
        return false;
    }

    // Extract the year, month, and day from the NRIC
    const birthYearSuffix = parseInt(nric.substring(0, 2), 10); // First two digits (year suffix)
    const birthMonth = parseInt(nric.substring(2, 4), 10); // Next two digits (month)
    const birthDay = parseInt(nric.substring(4, 6), 10); // Next two digits (day)

    // Calculate the full birth year (e.g., 99 -> 1999, 01 -> 2001)
    const currentYear = new Date().getFullYear();
    const fullBirthYear = birthYearSuffix >= 22 ? 1900 + birthYearSuffix : 2000 + birthYearSuffix;

    // Check if the month and day are valid
    if (birthMonth < 1 || birthMonth > 12 || birthDay < 1 || birthDay > 31) {
        return false;
    }

    // Additional date validation can be added if needed (e.g., checking for valid days in specific months)
    // Here we assume a simple check, but you can extend it to validate the exact number of days in each month.

    return true;
};