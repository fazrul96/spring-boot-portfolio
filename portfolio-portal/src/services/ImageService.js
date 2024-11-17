import { API_BASE_URL, API_PRIVATE_URL } from './../constants/ApiConstants';
import { checkImageExists } from './../utils/imageUtils';

export const fetchImages = async (title, chapter, apiService, imageExtension) => {
    const imagesList = [];
    let counter = 1;
    let imageExists = true;

    while (imageExists) {
        const fileName = `${title}-${chapter}-${counter}${imageExtension}`;
        const imageUrl = API_BASE_URL + API_PRIVATE_URL + `files/${fileName}`;
        try {
            await checkImageExists(imageUrl);
            imagesList.push(imageUrl);
            counter++;
        } catch {
            imageExists = false;
        }
    }

    return imagesList;
};