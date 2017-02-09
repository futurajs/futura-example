PROJECT := futura-example

.PHONY: all
all: dist

# Development
.PHONY: develop
develop: node_modules
	@npm start --silent

.PHONY: lint
lint: node_modules
	@npm run lint --silent

# Distribution
.PHONY: dist tar publish
dist: node_modules
	@npm run build --silent

# Clean
.PHONY: clean distclean
clean:
	$(RM) -R _build/

distclean: clean
	$(RM) -R node_modules

# Internals
node_modules: package.json
	npm prune
	npm install
	touch "$@"
