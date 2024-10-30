def build_url(source, title, chapter):
    # Define suffixes for Asura titles
    asura_suffixes = {
        "nano-machine": "-0e72058d",  # Add more series titles and their suffixes here
        # "other-title": "-suffix-code",  # Example for other titles
    }

    # Define URL patterns for each source, including a special case for Asura
    if source == "hivetoon":
        url = f"https://hivetoon.com/2023/{title}-chapter-{chapter}/"

    elif source == "asura":
        # Check if title exists in the suffix dictionary
        suffix = asura_suffixes.get(title)
        if not suffix:
            raise ValueError(f"Suffix for Asura title '{title}' not found.")
        url = f"https://asuracomic.net/series/{title}{suffix}/chapter/{chapter}/"

    else:
        raise ValueError(f"URL pattern for source '{source}' not defined.")

    return url