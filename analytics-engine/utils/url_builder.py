from config.settings import WebtoonSource, WebtoonConfig

def _build_asura_url(title, chapter, suffix):
    """Builds the URL for the Asura source, checking for title-specific suffixes."""
    base_url = WebtoonConfig.BASE_URLS[WebtoonSource.ASURA]
    return f"{base_url}{title}{suffix}/chapter/{chapter}/"

def _build_hivetoon_url(title, chapter, suffix=""):
    """Builds the URL for the Hivetoon source."""
    base_url = WebtoonConfig.BASE_URLS[WebtoonSource.HIVETOON]
    return f"{base_url}{title}-chapter-{chapter}/"

def _build_vortex_url(title, chapter, suffix=""):
    """Builds the URL for the Asura source, checking for title-specific suffixes."""
    base_url = WebtoonConfig.BASE_URLS[WebtoonSource.VORTEX]
    return f"{base_url}{title}/chapter-{chapter}"

class URLBuilder:
    """Class for building URLs based on source, title, and chapter information."""

    def __init__(self):
        # Map sources to their corresponding URL builder methods
        self.url_patterns = {
            WebtoonSource.HIVETOON: _build_hivetoon_url,
            WebtoonSource.ASURA: _build_asura_url,
            WebtoonSource.VORTEX: _build_vortex_url
        }

    def build_url(self, source, title, chapter, suffix=""):
        """
        Builds a URL based on the source, title, and chapter number.

        Parameters:
            source (str): The source identifier (e.g., "hivetoon", "asura").
            title (str): The title of the webtoon or content.
            chapter (int or str): The chapter number.
            suffix (str, optional): Additional suffix for specific sources. Default is an empty string.

        Returns:
            str: The constructed URL for the specified source.

        Raises:
            ValueError: If the source is not defined in url_patterns.
        """
        if source in self.url_patterns:
            return self.url_patterns[source](title, chapter, suffix)

        raise ValueError(f"URL pattern for source '{source}' not defined.")