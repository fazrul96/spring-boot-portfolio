/**
 * Function to determine color based on age range
 * @param {number} age - The age to determine the color for
 * @returns {string} - The color code based on age range
 */
export const getAgeColor = (age) => {
    if (age <= 18) return "#4caf50"; // Green for lowest priority
    if (age <= 35) return "#ffeb3b"; // Yellow for medium priority
    if (age <= 50) return "#ff9800"; // Orange for high priority
    return "#ff3d00"; // Red for highest priority (50+)
};