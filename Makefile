.PHONY: help dev build clean serve deploy new-post new-page draft-list publish

HUGO := hugo
PUBLIC_DIR := public
PORT := 1313

help:
	@echo "Available commands:"
	@echo "  make dev         - Start Hugo development server with drafts"
	@echo "  make serve       - Start Hugo server (production mode)"
	@echo "  make build       - Build the site for production"
	@echo "  make clean       - Remove generated files"
	@echo "  make deploy      - Build and deploy (customize as needed)"
	@echo "  make new-post    - Create a new post (use TITLE='Your Title' LANG=en/fa)"
	@echo "  make new-page    - Create a new page (use TITLE='Your Title' LANG=en/fa)"
	@echo "  make draft-list  - List all draft posts"
	@echo "  make publish     - Publish a draft (use FILE=path/to/post.md)"

dev:
	$(HUGO) server -D --disableFastRender --bind 0.0.0.0 --port $(PORT)

serve:
	$(HUGO) server --bind 0.0.0.0 --port $(PORT)

build:
	$(HUGO) --minify --cleanDestinationDir

clean:
	rm -rf $(PUBLIC_DIR) resources .hugo_build.lock

deploy: clean build
	@echo "Build complete. Deploy $(PUBLIC_DIR) to your hosting service."

new-post:
	@if [ -z "$(TITLE)" ]; then \
		echo "Error: Please provide TITLE, e.g., make new-post TITLE='My Post' LANG=en"; \
		exit 1; \
	fi
	@LANG_CODE=$${LANG:-en}; \
	$(HUGO) new content/posts/$$LANG_CODE/$(shell echo $(TITLE) | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g').md

new-page:
	@if [ -z "$(TITLE)" ]; then \
		echo "Error: Please provide TITLE, e.g., make new-page TITLE='About' LANG=en"; \
		exit 1; \
	fi
	@LANG_CODE=$${LANG:-en}; \
	$(HUGO) new content/$$LANG_CODE/$(shell echo $(TITLE) | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g').md

draft-list:
	@grep -r "draft.*true" content/ --include="*.md" | cut -d: -f1 || echo "No drafts found"

publish:
	@if [ -z "$(FILE)" ]; then \
		echo "Error: Please provide FILE, e.g., make publish FILE=content/posts/en/my-post.md"; \
		exit 1; \
	fi
	@sed -i.bak 's/draft.*true/draft: false/' $(FILE) && rm $(FILE).bak
	@echo "Published: $(FILE)"
