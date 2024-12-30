import os
import logging
from constants.GeneralConstant import (
    ROOT_DIR,
    DOWNLOAD_DIR,
    LOG_CREATING_DIRECTORY,
    SUCCESS_DIRECTORY_CREATED
)


def prepare_download_directory(title, chapter):
    """Creates a unique directory for downloading images."""
    logging.info(LOG_CREATING_DIRECTORY.format(title=title, chapter=chapter))
    dir_name = f"{title}-chapter-{chapter}"
    unique_dir = os.path.join(ROOT_DIR, DOWNLOAD_DIR, dir_name)
    os.makedirs(unique_dir, exist_ok=True)
    logging.info(SUCCESS_DIRECTORY_CREATED.format(directory=unique_dir))
    return unique_dir
