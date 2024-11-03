from enum import Enum

# ---- Webtoon Sources ----
class WebtoonSource(Enum):
    HIVETOON = "hivetoon"
    ASURA = "asura"

class WebtoonConfig:
    BASE_URLS = {
        WebtoonSource.HIVETOON: "https://hivetoon.com/2023/",
        WebtoonSource.ASURA: "https://asuracomic.net/series/",
    }
    IMAGE_EXTENSIONS = {
        WebtoonSource.HIVETOON: ".jpg",
        WebtoonSource.ASURA: ".webp",
    }
    URL_PREFIXES = {
        WebtoonSource.HIVETOON: "https://cdn.hivetoon.com/wp-content/uploads/",
        WebtoonSource.ASURA: "gg.asuracomic.net",
    }
    HANDLERS = {
        WebtoonSource.HIVETOON: "HivetoonPatternHandler",
        WebtoonSource.ASURA: "AsuraPatternHandler",
    }

# ---- Download and Extraction Paths ----
DOWNLOAD_DIR = "webtoon_downloads"
EXTRACTED_IMAGES_DIRECTORY = "extracted_images"

# ---- Error Messages ----
ERROR_MESSAGES = {
    "no_file": "No file selected",
    "missing_fields": "title, chapter, source, and suffix are required",
    "unexpected_error": "An unexpected error occurred",
}

# ---- API Routes ----
class ApiRoutes:
    GENERATE_GRAPH = '/generate-graph'
    DOWNLOAD_WEBTOON = '/download-webtoon'