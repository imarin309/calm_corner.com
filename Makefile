.PHONY: lint format

lint:
	npx eslint & npx markdownlint-cli2 "content/**/*.mdx" & wait

format:
	npx eslint --fix & npx markdownlint-cli2 --fix "content/**/*.mdx" & wait



