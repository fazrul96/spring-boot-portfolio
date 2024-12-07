from handlers.BaseHandler import BasePatternHandler
from config.WebtoonConfig import WebtoonConfig, WebtoonSource


class HivetoonPatternHandler(BasePatternHandler):
    """Specific handler for Hivetoon source."""

    def __init__(self):
        super().__init__(config={
            "URL_PREFIX": WebtoonConfig.URL_PREFIXES[WebtoonSource.HIVETOON],
            "IMAGE_EXTENSION": WebtoonConfig.IMAGE_EXTENSIONS[WebtoonSource.HIVETOON]
        })
