import logging

from config.WebtoonConfig import WebtoonConfig
from handlers.BasePatternHandler import BasePatternHandler

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class PatternHandlerFactory:
    """Factory class to retrieve the correct handler based on the source."""

    _handler_cache = {}

    @staticmethod
    def get_pattern_handler(source):
        """Retrieve the appropriate handler for the given source."""
        logging.info(f"Retrieving handler for source: {source}")

        if source in PatternHandlerFactory._handler_cache:
            logging.info(f"Using cached handler for source: {source}")
            return PatternHandlerFactory._handler_cache[source]

        if source in WebtoonConfig.URL_PREFIXES:
            handler = BasePatternHandler(source)
            PatternHandlerFactory._handler_cache[source] = handler
            return handler

        raise ValueError(f"No handler found for source: {source}")
