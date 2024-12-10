import logging

from config.WebtoonConfig import WebtoonConfig
from constants.GeneralConstant import (
    ERROR_INVALID_SOURCE,
    ERROR_MISSING_IMAGE_EXTENSION, LOG_STARTING_DOWNLOAD
)
from service.WebDriverManagerService import WebDriverManager
from utils.DirectoryUtil import prepare_download_directory
from utils.ImageUtil import compress_images, process_images


class BasePatternHandler:
    """Base class for handling pattern downloads with common methods."""

    def __init__(self, source):
        if source not in WebtoonConfig.URL_PREFIXES or source not in WebtoonConfig.IMAGE_EXTENSIONS:
            raise ValueError(f"Invalid source: {source}")
        self.source = source
        self.url_prefix = WebtoonConfig.URL_PREFIXES.get(source)
        self.image_extension = WebtoonConfig.IMAGE_EXTENSIONS.get(source)

        if not self.source:
            raise ValueError(ERROR_INVALID_SOURCE.format(source=source))
        if not self.image_extension:
            raise ValueError(ERROR_MISSING_IMAGE_EXTENSION.format(source=source))

    def download_images(self, title, chapter, url):
        """Generic method for downloading images based on source-specific configuration."""
        logging.info(LOG_STARTING_DOWNLOAD.format(
            url_prefix=self.url_prefix,
            image_extension=self.image_extension
        ))
        with WebDriverManager.setup_driver() as driver:
            unique_dir = prepare_download_directory(title, chapter)
            images_found = process_images(
                driver, title, chapter, url, unique_dir, self.image_extension, self.url_prefix, self.source)
        return compress_images(unique_dir) if images_found else None
