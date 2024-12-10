from config.WebtoonConfig import WebtoonSource, WebtoonConfig


class URLBuilder:
    """Class for building URLs based on source, title, and chapter information."""

    def build_url(self, source: WebtoonSource, title: str, chapter: int, suffix: str = "") -> str:
        """
        Builds a URL based on the source, title, and chapter number using a pattern from the configuration.

        Args:
            source (WebtoonSource): The source identifier (e.g., WebtoonSource.HIVETOON).
            title (str): The title of the webtoon or content.
            chapter (int): The chapter number.
            suffix (str, optional): Additional suffix for specific sources. Default is an empty string.

        Returns:
            str: The constructed URL for the specified source.

        Raises:
            ValueError: If the source is not defined in `WebtoonConfig`.
        """
        base_url = WebtoonConfig.BASE_URLS.get(source)
        url_pattern = WebtoonConfig.URL_PATTERNS.get(source)

        if not base_url or not url_pattern:
            raise ValueError(f"No configuration found for source: {source}")

        # Use the pattern to generate the URL
        return url_pattern.format(base_url=base_url, title=title, chapter=chapter, suffix=suffix)
