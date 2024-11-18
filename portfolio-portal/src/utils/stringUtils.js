import { DASH, EMPTY_STRING, SINGLE_SPACE } from './../constants/AppConstants';

export const toProperCase = (text, delimiter = DASH) => {
    return text
        .split(delimiter)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(SINGLE_SPACE);
};

export const extractChapterNumber = (chapter) => chapter.match(/\d+/)?.[0] || EMPTY_STRING;

export const formatImages = (images) =>
    images.map((img) => `data:image/png;base64,${img}`);