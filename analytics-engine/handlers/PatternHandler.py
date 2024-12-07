import logging
import os

from config.WebtoonConfig import WebtoonConfig, WebtoonSource
from constants.GeneralConstant import DOWNLOAD_DIR
from service.WebDriverManagerService import WebDriverManager
from utils.ImageUtil import compress_images, process_images

# Setup logging for better traceability
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class PatternHandlerFactory:
    """Factory class to retrieve the correct handler based on the source."""

    @staticmethod
    def get_pattern_handler(source):
        logging.info(f"Trying to get handler for source: {source}")
        if source in WebtoonConfig.HANDLERS:
            handler_name = WebtoonConfig.HANDLERS[source]
            logging.info(f"Found handler: {handler_name} for source: {source}")
            handler_class = globals().get(handler_name)
            if handler_class:
                return handler_class()
        logging.warning("No specific handler found for source; using BasePatternHandler as default.")
        return BasePatternHandler(config={"URL_PREFIX": "", "IMAGE_EXTENSION": ""})


def extract_sequence(image_url):
    """Extracts the sequence number from the image URL or filename."""
    import re
    match = re.search(r'(\d+)-optimized', image_url)  # Adjust regex based on your pattern
    if match:
        return int(match.group(1))
    return None


class BasePatternHandler:
    """Base class for handling pattern downloads with common methods."""

    def __init__(self, config):
        self.url_prefix = config.get("URL_PREFIX", "")
        self.image_extension = config.get("IMAGE_EXTENSION", "")
        if not self.image_extension:
            raise ValueError("Image extension must not be empty.")

    def download_images(self, title, chapter, url):
        """Generic method for downloading images based on source-specific configuration."""
        logging.info(f"Starting download for images with prefix {self.url_prefix}...")
        with WebDriverManager.setup_driver() as driver:
            unique_dir = self.prepare_download_directory(title, chapter)
            images_found = process_images(driver, title, chapter, url, unique_dir, self.image_extension, self.url_prefix)
        return compress_images(unique_dir) if images_found else None

    def prepare_download_directory(self, title, chapter):
        """Creates a unique directory for downloading images."""
        logging.info(f"Started creating directory for {title}...")
        root_dir = "public"
        dir_name = f"{title}-chapter-{chapter}"
        unique_dir = os.path.join(root_dir, DOWNLOAD_DIR, dir_name)
        os.makedirs(unique_dir, exist_ok=True)
        logging.info(f"Successfully creating directory {unique_dir}...")
        return unique_dir


class HivetoonPatternHandler(BasePatternHandler):
    def __init__(self):
        super().__init__(config={
            "URL_PREFIX": WebtoonConfig.URL_PREFIXES[WebtoonSource.HIVETOON],
            "IMAGE_EXTENSION": WebtoonConfig.IMAGE_EXTENSIONS[WebtoonSource.HIVETOON]
        })


class AsuraPatternHandler(BasePatternHandler):
    def __init__(self):
        super().__init__(config={
            "URL_PREFIX": WebtoonConfig.URL_PREFIXES[WebtoonSource.ASURA],
            "IMAGE_EXTENSION": WebtoonConfig.IMAGE_EXTENSIONS[WebtoonSource.ASURA]
        })


class VortexPatternHandler(BasePatternHandler):
    def __init__(self):
        super().__init__(config={
            "URL_PREFIX": WebtoonConfig.URL_PREFIXES[WebtoonSource.VORTEX],
            "IMAGE_EXTENSION": WebtoonConfig.IMAGE_EXTENSIONS[WebtoonSource.VORTEX]
        })


class MangatownPatternHandler(BasePatternHandler):
    def __init__(self):
        super().__init__(config={
            "URL_PREFIX": WebtoonConfig.URL_PREFIXES[WebtoonSource.MANGATOWN],
            "IMAGE_EXTENSION": WebtoonConfig.IMAGE_EXTENSIONS[WebtoonSource.MANGATOWN]
        })
