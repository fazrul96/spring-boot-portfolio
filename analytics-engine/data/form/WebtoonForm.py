def webtoon_form_data(form):
    """Extract and return form data."""
    title = form.get("title")
    chapter = form.get("chapter")
    source = form.get("source")
    suffix = form.get("suffix")
    return title, chapter, source, suffix
