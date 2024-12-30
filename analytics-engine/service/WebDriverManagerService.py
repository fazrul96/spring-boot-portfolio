from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import requests


class WebDriverManager:
    """Manages Selenium WebDriver setup and teardown."""

    @staticmethod
    def setup_driver(headless=True):
        """Returns a configured Selenium WebDriver instance."""
        chrome_options = Options()
        if headless:
            chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    @staticmethod
    def get_session_from_driver(driver):
        cookies = {cookie['name']: cookie['value'] for cookie in driver.get_cookies()}
        session = requests.Session()
        for key, value in cookies.items():
            session.cookies.set(key, value)
        return session
