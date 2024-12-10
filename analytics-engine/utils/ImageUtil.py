import logging
import os
import re
import time
from zipfile import ZipFile

import requests
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait

from config.WebtoonConfig import WebtoonSource, WebtoonConstants
from service.WebDriverManagerService import WebDriverManager
from utils.HeaderUtil import (
    get_random_user_agent
)


def download_image_with_header(image_url, save_path, retries=1, delay=2):
    """Downloads an image with retry and custom headers."""
    headers = {
        "User-Agent": get_random_user_agent()
        # "Referer": get_realistic_referer()
    }

    driver = WebDriverManager.setup_driver(headless=True)
    driver.get(WebtoonConstants.MANGATOWN_DOMAIN)
    session = WebDriverManager.get_session_from_driver(driver)
    driver.quit()

    for attempt in range(retries):
        try:
            response = session.get(image_url, headers=headers, timeout=10)
            response.raise_for_status()
            with open(save_path, "wb") as file:
                file.write(response.content)
            logging.info(f"Downloaded: {save_path}")
            return True
        except requests.RequestException as e:
            logging.warning(f"Attempt {attempt + 1} failed for {image_url}: {e}")
            if attempt < retries - 1:
                time.sleep(delay)
    logging.error(f"Failed to download after {retries} attempts: {image_url}")
    return False


def download_image_without_header(image_url, save_path):
    """Helper function to download an image from a URL and handle errors."""
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        with open(save_path, "wb") as file:
            file.write(response.content)
        logging.info(f"Downloaded: {save_path}")
        return True
    except requests.RequestException as e:
        logging.error(f"Failed to download {image_url}: {e}")
        return False


def compress_images(directory_path):
    """Compresses downloaded images in the specified directory into a zip file."""
    if not os.path.exists(directory_path):
        logging.error(f"Directory not found: {directory_path}")
        return None

    zip_path = os.path.abspath(f"{directory_path}.zip")
    try:
        with ZipFile(zip_path, "w") as zip_file:
            for root, _, files in os.walk(directory_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    zip_file.write(file_path, arcname=file)
        logging.info(f"Images compressed into: {zip_path}")
    except Exception as e:
        logging.error(f"Error compressing images: {e}")
        return None
    return zip_path


def process_images(driver, title, chapter, url, unique_dir, image_extension, url_prefix, source):
    """Processes images by fetching them from a URL and downloading them in the correct sequence."""
    logging.info(f"Started processing images for {title}...")

    if source == WebtoonSource.ASURA:
        xpath = "//img[@src and @fetchpriority='high']"
    else:
        xpath = "//img[@src]"

    driver.get(url)

    try:
        # Wait for all images to load
        WebDriverWait(driver, 20).until(
            expected_conditions.presence_of_all_elements_located((By.XPATH, xpath))
        )
    except Exception as e:
        logging.error(f"Error waiting for images: {e}")
        return False

    image_elements = driver.find_elements(By.XPATH, xpath)
    logging.info(f"Found {len(image_elements)} image elements.")

    # Prepare a list of tuples containing image sequence and URL
    images = []

    if source == WebtoonSource.ASURA:
        for image in image_elements:
            image_url = image.get_attribute("data-src") or image.get_attribute("src")
            if is_valid_image(image_url, image_extension, url_prefix):
                sequence = extract_sequence(image_url)
                if sequence is not None:
                    images.append((sequence, image_url))
    else:
        for image in image_elements:
            image_url = image.get_attribute("src")
            images.append((len(images) + 1, image_url))

    # Sort images by sequence
    images.sort(key=lambda x: x[0])

    # Download images in the correct order
    for index, (sequence, image_url) in enumerate(images, start=1):
        if not image_extension.startswith('.'):
            raise ValueError(f"Invalid image extension: {image_extension}")

        file_name = f"{title}-chapter-{chapter}-{str(index).zfill(3)}{image_extension}"
        save_path = os.path.join(unique_dir, file_name)
        if download_image_with_header(image_url, save_path):
            logging.info(f"Downloaded: {file_name}")

    return len(images) > 0  # Returns True if any images were processed


def extract_sequence(image_url):
    """Extracts the sequence number from the image URL or filename."""
    match = re.search(r'(\d+)-optimized', image_url)  # Adjust regex based on your pattern
    if match:
        return int(match.group(1))
    return None


def is_valid_image(image_url, image_extension, url_prefix):
    """Checks if an image URL matches the handler's criteria."""
    return url_prefix in image_url and image_url.endswith(image_extension)
