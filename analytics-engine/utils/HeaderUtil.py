import random
from constants.HeaderConstant import USER_AGENTS, REFERERS


def get_random_user_agent():
    """Selects a random User-Agent from the list."""
    return random.choice(USER_AGENTS)


def get_realistic_referer(image_url):
    """Generates a random referer from the list."""
    return random.choice(REFERERS)
