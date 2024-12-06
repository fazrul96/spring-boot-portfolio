from enum import Enum

# ---- Webtoon Sources ----
class WebtoonSource(Enum):
    HIVETOON = "hivetoon"
    ASURA = "asura"
    VORTEX = "vortex"

class WebtoonConfig:
    BASE_URLS = {
        WebtoonSource.HIVETOON: "https://hivetoon.com/2023/",
        WebtoonSource.ASURA: "https://asuracomic.net/series/",
        WebtoonSource.VORTEX: "https://vortexscans.org/series/",
    }
    IMAGE_EXTENSIONS = {
        WebtoonSource.HIVETOON: ".jpg",
        WebtoonSource.ASURA: ".webp",
        WebtoonSource.VORTEX: ".webp",
    }
    URL_PREFIXES = {
        WebtoonSource.HIVETOON: "https://cdn.hivetoon.com/wp-content/uploads/",
        WebtoonSource.ASURA: "gg.asuracomic.net",
        WebtoonSource.VORTEX: "https://storage.vexmanga.com/public//upload/",
    }
    HANDLERS = {
        WebtoonSource.HIVETOON: "HivetoonPatternHandler",
        WebtoonSource.ASURA: "AsuraPatternHandler",
        WebtoonSource.VORTEX: "VortexPatternHandler",
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
    DOWNLOAD_ZIP = '/download-zip'