from enum import Enum


# ---- Webtoon Sources ----
class WebtoonSource(Enum):
    HIVETOON = "hivetoon"
    ASURA = "asura"
    VORTEX = "vortex"
    MANGATOWN = "mangatown"


class WebtoonConfig:
    BASE_URLS = {
        WebtoonSource.HIVETOON: "https://hivetoon.com/2023/",
        WebtoonSource.ASURA: "https://asuracomic.net/series/",
        WebtoonSource.VORTEX: "https://vortexscans.org/series/",
        WebtoonSource.MANGATOWN: "https://www.mangatown.com/manga/",
    }
    URL_PATTERNS = {
        WebtoonSource.HIVETOON: "{base_url}{title}-chapter-{chapter}/",
        WebtoonSource.ASURA: "{base_url}{title}{suffix}/chapter/{chapter}/",
        WebtoonSource.VORTEX: "{base_url}{title}/chapter-{chapter}",
        WebtoonSource.MANGATOWN: "{base_url}{title}/c001",
    }
    IMAGE_EXTENSIONS = {
        WebtoonSource.HIVETOON: ".jpg",
        WebtoonSource.ASURA: ".webp",
        WebtoonSource.VORTEX: ".webp",
        WebtoonSource.MANGATOWN: ".jpg",
    }
    URL_PREFIXES = {
        WebtoonSource.HIVETOON: "https://cdn.hivetoon.com/wp-content/uploads/",
        WebtoonSource.ASURA: "gg.asuracomic.net",
        WebtoonSource.VORTEX: "https://storage.vexmanga.com/public//upload/",
        WebtoonSource.MANGATOWN: "",
    }
    HANDLERS = {
        WebtoonSource.HIVETOON: "HivetoonPatternHandler",
        WebtoonSource.ASURA: "AsuraPatternHandler",
        WebtoonSource.VORTEX: "VortexPatternHandler",
        WebtoonSource.MANGATOWN: "MangatownPatternHandler",
    }
