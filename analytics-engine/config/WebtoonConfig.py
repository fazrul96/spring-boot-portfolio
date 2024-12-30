from enum import Enum


# ---- Constants ----
class WebtoonConstants:
    IMAGE_EXTENSION_WEBP = ".webp"
    IMAGE_EXTENSION_JPG = ".jpg"
    IMAGE_EXTENSION_PNG = ".png"
    URL_PATTERN_TEMPLATE = "{base_url}{title}{chapter_suffix}"
    POSSIBLE_YEARS = ["2023", "2024"]

    HIVETOON_DOMAIN = "https://hivetoon.com"
    ASURA_DOMAIN = "https://asuracomic.net"
    VORTEX_DOMAIN = "https://vortexscans.org"
    MANGATOWN_DOMAIN = "https://www.mangatown.com"
    ROLIOSCAN_DOMAIN = "https://roliascan.com"

    HIVETOON_CHAPTER_SUFFIX = "-chapter-{chapter}/"
    ASURA_CHAPTER_SUFFIX = "{suffix}/chapter/{chapter}/"
    VORTEX_CHAPTER_SUFFIX = "/chapter-{chapter}"
    MANGATOWN_CHAPTER_SUFFIX = "/c{chapter}"
    ROLIOSCAN_CHAPTER_SUFFIX = "/chapter-{chapter}"


# ---- Webtoon Sources ----
class WebtoonSource(Enum):
    HIVETOON = "hivetoon"
    ASURA = "asura"
    VORTEX = "vortex"
    MANGATOWN = "mangatown"
    ROLIOSCAN = "roliascan"


class WebtoonConfig:
    BASE_URLS = {
        WebtoonSource.HIVETOON: WebtoonConstants.HIVETOON_DOMAIN + "/series/",
        WebtoonSource.ASURA: WebtoonConstants.ASURA_DOMAIN + "/series/",
        WebtoonSource.VORTEX: WebtoonConstants.VORTEX_DOMAIN + "/series/",
        WebtoonSource.MANGATOWN: WebtoonConstants.MANGATOWN_DOMAIN + "/manga/",
        WebtoonSource.ROLIOSCAN: WebtoonConstants.ROLIOSCAN_DOMAIN + "/manga/",
    }
    URL_PATTERNS = {
        WebtoonSource.HIVETOON: WebtoonConstants.URL_PATTERN_TEMPLATE.format(
            base_url="{base_url}", title="{title}", chapter_suffix=WebtoonConstants.HIVETOON_CHAPTER_SUFFIX),
        WebtoonSource.ASURA: WebtoonConstants.URL_PATTERN_TEMPLATE.format(
            base_url="{base_url}", title="{title}", chapter_suffix=WebtoonConstants.ASURA_CHAPTER_SUFFIX),
        WebtoonSource.VORTEX: WebtoonConstants.URL_PATTERN_TEMPLATE.format(
            base_url="{base_url}", title="{title}", chapter_suffix=WebtoonConstants.VORTEX_CHAPTER_SUFFIX),
        WebtoonSource.MANGATOWN: WebtoonConstants.URL_PATTERN_TEMPLATE.format(
            base_url="{base_url}", title="{title}", chapter_suffix=WebtoonConstants.MANGATOWN_CHAPTER_SUFFIX),
        WebtoonSource.ROLIOSCAN: WebtoonConstants.URL_PATTERN_TEMPLATE.format(
            base_url="{base_url}", title="{title}", chapter_suffix=WebtoonConstants.ROLIOSCAN_CHAPTER_SUFFIX),

    }
    IMAGE_EXTENSIONS = {
        WebtoonSource.HIVETOON: WebtoonConstants.IMAGE_EXTENSION_JPG,
        WebtoonSource.ASURA: WebtoonConstants.IMAGE_EXTENSION_WEBP,
        WebtoonSource.VORTEX: WebtoonConstants.IMAGE_EXTENSION_WEBP,
        WebtoonSource.MANGATOWN: WebtoonConstants.IMAGE_EXTENSION_JPG,
        WebtoonSource.ROLIOSCAN: WebtoonConstants.IMAGE_EXTENSION_PNG,
    }
    URL_PREFIXES = {
        WebtoonSource.HIVETOON: "https://cdn.hivetoon.com/wp-content/uploads/",
        WebtoonSource.ASURA: "gg.asuracomic.net",
        WebtoonSource.VORTEX: "https://storage.vexmanga.com/public//upload/",
        WebtoonSource.MANGATOWN: None,
        WebtoonSource.ROLIOSCAN: None,
    }
    HANDLERS = {
        WebtoonSource.HIVETOON: "HivetoonPatternHandler",
        WebtoonSource.ASURA: "AsuraPatternHandler",
        WebtoonSource.VORTEX: "VortexPatternHandler",
        WebtoonSource.MANGATOWN: "MangatownPatternHandler",
        WebtoonSource.ROLIOSCAN: "RolioscanPatternHandler",
    }
