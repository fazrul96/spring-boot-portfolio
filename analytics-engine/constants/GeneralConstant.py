# ---- Download and Extraction Paths ----
ROOT_DIR = "public"
DOWNLOAD_DIR = "webtoon_downloads"
EXTRACTED_IMAGES_DIRECTORY = "extracted_images"

# ---- Error Messages ----
ERROR_MESSAGES = {
    "no_file": "No file selected",
    "missing_fields": "title, chapter, source, and suffix are required",
    "unexpected_error": "An unexpected error occurred",
}

ERROR_INVALID_SOURCE = "Invalid source: {source}"
ERROR_MISSING_IMAGE_EXTENSION = "Image extension for source '{source}' must not be empty."

SUCCESS_DIRECTORY_CREATED = "Directory created: {directory}"

LOG_CREATING_DIRECTORY = "Creating directory for title '{title}', chapter {chapter}..."
LOG_STARTING_DOWNLOAD = "Starting download for images from {url_prefix} for source '{image_extension}'..."
LOG_RETRIEVING_HANDLER = "Retrieving handler for source: {source}"
LOG_USING_CACHED_HANDLER = "Using cached handler for source: {source}"
