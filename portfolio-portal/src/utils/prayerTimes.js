// Helper function to fetch prayer times for a given city.
export const fetchPrayerTimes = async (city) => {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Malaysia&method=8`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response code is 200 (success)
        if (data.code !== 200) {
            throw new Error(`Failed to fetch prayer times. Response code: ${data.code}`);
        }

        return data.data.timings; // Return prayer timings if successful
    } catch (err) {
        throw new Error(`Error fetching prayer times: ${err.message}`); // General error handling
    }
};

// Convert time from 12-hour format (HH:mm) to 24-hour format as an integer for easy comparison (HHmm).
export const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.split(":").map(num => parseInt(num, 10)); // Destructure and parse hours and minutes
    return hours * 100 + minutes; // Convert time into "HHmm" format integer
};

// Find the next prayer based on the current time.
export const findNextPrayer = (prayers, prayerTimes, currentTime24) => {
    // Collect all prayer time differences in an array
    const prayerDifferences = prayers.map(prayer => {
        const prayerTime = prayerTimes[prayer];
        if (!prayerTime) return null; // Skip if prayer time is not available

        const prayerTime24 = convertTo24HourFormat(prayerTime);
        let diff = currentTime24 - prayerTime24;

        // Adjust for next day if the difference is negative
        if (diff < 0) {
            diff += 2400; // Add 2400 to handle the next day scenario
        }

        return { prayer, prayerTime, diff }; // Return the prayer with its time difference
    }).filter(Boolean); // Remove any null values from the array

    const sortedPrayers = prayerDifferences.sort((a, b) => b.diff - a.diff);
    // The first element in the sorted array will be the next prayer
    const nextPrayerDetails = sortedPrayers[0];

    return { nextPrayerDetails };
};
