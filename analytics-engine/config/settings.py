HIVETOON_BASE_URL = "https://hivetoon.com/2023/"
ASURA_BASE_URL = "https://asuracomic.net/series/"
SUPPORTED_URLS = {
    "hivetoon": "HivetoonPatternHandler",
    "asura": "AsuraPatternHandler",
}

ASURA_SUFFIXES = {
    "nano-machine": "-0e72058d",  # Add more series titles and their suffixes here
    # "other-title": "-suffix-code",  # Example for other titles
}

DOWNLOAD_DIR = "webtoon_downloads"
EXTRACTED_IMAGES_DIRECTORY = "extracted_images"

HIVETOON_URL_PREFIX = "https://cdn.hivetoon.com/wp-content/uploads/"
ASURA_URL_PREFIX = "gg.asuracomic.net"

ASURA_IMAGE_EXTENSION = ".webp"
HIVETOON_IMAGE_EXTENSION = ".jpg"

ERROR_MESSAGES = {
    "no_file": "No file selected",
    "missing_fields": "Title, chapter, and source are required",
    "unexpected_error": "An unexpected error occurred",
}

GENERATE_GRAPH_ROUTE = '/generate-graph'
DOWNLOAD_WEBTOON_ROUTE = '/download-webtoon'
