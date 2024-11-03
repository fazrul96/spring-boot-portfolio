import { DASH, ONE_SPACE } from './../constants/AppConstants';

export const toProperCase = (text, delimiter = DASH) => {
    return text
        .split(delimiter)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(ONE_SPACE);
};
