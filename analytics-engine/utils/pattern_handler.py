import os
import requests
import logging
from zipfile import ZipFile
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from config.settings import WebtoonConfig, WebtoonSource, DOWNLOAD_DIR

# Setup logging for better traceability
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class WebDriverManager:
    """Manages Selenium WebDriver setup and teardown."""
    @staticmethod
    def setup_driver():
        """Configures and returns a headless Chrome WebDriver."""
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

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
            images_found = self.process_images(driver, title, chapter, url, "//img[@src]", unique_dir)
        return self.compress_images(unique_dir) if images_found else None

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
        root_dir = f"public"
        dir_name = f"{title}-chapter-{chapter}"
        unique_dir = os.path.join(root_dir, DOWNLOAD_DIR, dir_name)
        os.makedirs(unique_dir, exist_ok=True)
        return unique_dir

    def process_images(self, driver, title, chapter, url, xpath, unique_dir):
        """Processes images by fetching them from a URL and downloading those that match specified criteria."""
        image_index = 1
        driver.get(url)
        image_elements = driver.find_elements(By.XPATH, xpath)
        for image in image_elements:
            image_url = image.get_attribute("src")
            if self.is_valid_image(image_url):
                if not self.image_extension.startswith('.'):
                    raise ValueError(f"Invalid image extension: {self.image_extension}")

                file_name = f"{title}-chapter-{chapter}-{image_index}{self.image_extension}"
                save_path = os.path.join(unique_dir, file_name)
                if download_image(image_url, save_path):
                    image_index += 1  # Increment only when a valid image is downloaded
        return image_index > 1  # Returns True if any images were downloaded

    def is_valid_image(self, image_url):
        """Checks if an image URL matches the handler's criteria."""
        return self.url_prefix in image_url and image_url.endswith(self.image_extension)

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