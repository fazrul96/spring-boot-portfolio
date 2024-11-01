from config.settings import HIVETOON_BASE_URL, ASURA_BASE_URL, ASURA_SUFFIXES


def build_url(source, title, chapter):
    """Builds a URL based on the source, title, and chapter number."""

    # Define URL patterns for each source, using constants
    url_patterns = {
        "hivetoon": lambda title, chapter: f"{HIVETOON_BASE_URL}{title}-chapter-{chapter}/",
        "asura": lambda title, chapter: build_asura_url(title, chapter),
    }

    # Check if the source is defined in url_patterns
    if source in url_patterns:
        return url_patterns[source](title, chapter)

    raise ValueError(f"URL pattern for source '{source}' not defined.")


def build_asura_url(title, chapter):
    """Builds the URL for the Asura source, checking for title-specific suffixes."""

    # Check if title exists in the suffix dictionary
    suffix = ASURA_SUFFIXES.get(title)
    if not suffix:
        raise ValueError(f"Suffix for Asura title '{title}' not found.")

    return f"{ASURA_BASE_URL}{title}{suffix}/chapter/{chapter}/"
