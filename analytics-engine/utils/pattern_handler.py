import os
import requests
import logging
from zipfile import ZipFile
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from config.settings import SUPPORTED_URLS, DOWNLOAD_DIR, HIVETOON_URL_PREFIX, ASURA_URL_PREFIX, ASURA_IMAGE_EXTENSION, \
    HIVETOON_IMAGE_EXTENSION

# Setup logging for better traceability
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def setup_driver():
    """Configures and returns a headless Chrome WebDriver."""
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


def get_pattern_handler(source):
    """Retrieves the correct handler class based on the source."""
    handler_name = SUPPORTED_URLS.get(source)
    if handler_name:
        handler_class = globals().get(handler_name)
        if handler_class:
            return handler_class()
    logging.warning("No specific handler found for source; using BasePatternHandler as default.")
    return BasePatternHandler(config={"URL_PREFIX": "", "IMAGE_EXTENSION": ""})


def download_image(image_url, save_path):
    """Helper function to download an image from a URL and handle errors."""
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        with open(save_path, "wb") as handler:
            handler.write(response.content)
        logging.info(f"Downloaded: {save_path}")
        return True
    except requests.RequestException as e:
        logging.error(f"Failed to download {image_url}: {e}")
        return False


class BasePatternHandler:
    """Base class for handling pattern downloads with common methods."""

    def __init__(self, config):
        self.url_prefix = config.get("URL_PREFIX", "")
        self.image_extension = config.get("IMAGE_EXTENSION", "")

    def download_images(self, title, chapter, url):
        """Generic method for downloading images based on source-specific configuration."""
        logging.info(f"Starting download for images with prefix {self.url_prefix}...")
        return self.process_images(title, chapter, url, "//img[@src]")

    def compress_images(self, directory_path):
        """Compresses downloaded images in the specified directory into a zip file."""
        zip_path = f"{directory_path}.zip"
        try:
            with ZipFile(zip_path, "w") as zip_file:
                for root, _, files in os.walk(directory_path):
                    for file in files:
                        zip_file.write(os.path.join(root, file), arcname=file)
            logging.info(f"Images compressed into: {zip_path}")
        except Exception as e:
            logging.error(f"Error compressing images: {e}")
        return zip_path

    def prepare_download_directory(self, title, chapter):
        """Creates a unique directory for downloading images."""
        dir_name = f"{title}-chapter-{chapter}"
        unique_dir = os.path.join(DOWNLOAD_DIR, dir_name)
        os.makedirs(unique_dir, exist_ok=True)
        return unique_dir

    def process_images(self, title, chapter, url, xpath):
        """Processes images by fetching them from a URL and downloading those that match specified criteria."""
        driver = setup_driver()
        unique_dir = self.prepare_download_directory(title, chapter)
        image_index = 1

        try:
            driver.get(url)
            image_elements = driver.find_elements(By.XPATH, xpath)
            for image in image_elements:
                image_url = image.get_attribute("src")
                if self.is_valid_image(image_url):
                    file_name = f"{title}-chapter-{chapter}-{image_index}{self.image_extension}"
                    save_path = os.path.join(unique_dir, file_name)
                    if download_image(image_url, save_path):
                        image_index += 1  # Increment only when a valid image is downloaded
        except Exception as e:
            logging.error(f"Error during image download process: {e}")
        finally:
            driver.quit()

        return self.compress_images(unique_dir)

    def is_valid_image(self, image_url):
        """Checks if an image URL matches the handler's criteria."""
        return self.url_prefix in image_url and image_url.endswith(self.image_extension)


class HivetoonPatternHandler(BasePatternHandler):
    def __init__(self):
        super().__init__(config={
            "URL_PREFIX": HIVETOON_URL_PREFIX,
            "IMAGE_EXTENSION": HIVETOON_IMAGE_EXTENSION
        })


class AsuraPatternHandler(BasePatternHandler):
    def __init__(self):
        super().__init__(config={
            "URL_PREFIX": ASURA_URL_PREFIX,
            "IMAGE_EXTENSION": ASURA_IMAGE_EXTENSION
        })
