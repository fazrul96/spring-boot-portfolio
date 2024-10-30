import os
import requests
from zipfile import ZipFile
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from config.settings import SUPPORTED_URLS

def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

def get_pattern_handler(source):
    handler_name = SUPPORTED_URLS.get(source)
    if handler_name:
        handler_class = globals().get(handler_name)
        if handler_class:
            return handler_class()
    else:
        print("No specific handler found for source; using HivetoonPatternHandler as default.")
        return HivetoonPatternHandler()

class BasePatternHandler:
    def download_images(self, title, chapter, url):
        raise NotImplementedError("This method should be implemented by subclasses.")

class HivetoonPatternHandler(BasePatternHandler):
    def download_images(self, title, chapter, url):
        driver = setup_driver()
        unique_dir = os.path.join("webtoon_downloads", f"{title}_{chapter}")
        os.makedirs(unique_dir, exist_ok=True)

        try:
            driver.get(url)
            image_elements = driver.find_elements(By.XPATH, "//img[@src]")
            for index, image in enumerate(image_elements):
                image_url = image.get_attribute("src")
                if "https://cdn.hivetoon.com/wp-content/uploads/" in image_url:
                    img_data = requests.get(image_url).content
                    with open(f"{unique_dir}/image_{index + 1}.jpg", "wb") as handler:
                        handler.write(img_data)
        finally:
            driver.quit()

        zip_path = f"{unique_dir}.zip"
        with ZipFile(zip_path, "w") as zip_file:
            for root, _, files in os.walk(unique_dir):
                for file in files:
                    zip_file.write(os.path.join(root, file), arcname=file)

        return zip_path

# todo need more improvement instead download all image including logo etc, need to specify more like in hivetoon
class AsuraPatternHandler(BasePatternHandler):
    def download_images(self, title, chapter, url):
        driver = setup_driver()
        unique_dir = os.path.join("webtoon_downloads", f"{title}_{chapter}")
        os.makedirs(unique_dir, exist_ok=True)

        try:
            driver.get(url)

            # Adjust XPath or CSS selector based on Asura’s HTML structure
            image_elements = driver.find_elements(By.XPATH, "//img[@src]")

            for index, image in enumerate(image_elements):
                image_url = image.get_attribute("src")
                # Adjust the condition if Asura’s CDN URL is different
                if "asuracomic" in image_url:  # Assuming images come from Asura's domain
                    img_data = requests.get(image_url).content
                    with open(f"{unique_dir}/image_{index + 1}.jpg", "wb") as handler:
                        handler.write(img_data)
        finally:
            driver.quit()

        # Compress the images into a zip file
        zip_path = f"{unique_dir}.zip"
        with ZipFile(zip_path, "w") as zip_file:
            for root, _, files in os.walk(unique_dir):
                for file in files:
                    zip_file.write(os.path.join(root, file), arcname=file)

        return zip_path