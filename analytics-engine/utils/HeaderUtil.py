import random
from constants.HeaderConstant import USER_AGENTS, REFERERS


def get_random_user_agent():
    """Selects a random User-Agent from the list."""
    return random.choice(USER_AGENTS)


def get_realistic_referer(image_url):
    """Generates a referer based on the context of the image URL."""
    if "vortexscans.org" in image_url:
        return "https://vortexscans.org/"
    elif "reddit.com" in image_url:
        return "https://www.reddit.com/"
    return random.choice(REFERERS)
