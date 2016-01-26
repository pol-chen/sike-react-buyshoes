.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/app.css --output bundle/app.css

.PHONY: js
js:
	mkdir -p build
	webpack -d --watch --progress js/app.jsx build/app.js --module-bind "js=babel" --module-bind "jsx=babel"

.PHONY: minjs
minjs:
	mkdir -p bundle
	webpack -p --progress js/app.jsx bundle/app.js --module-bind "js=babel" --module-bind "jsx=babel"

.PHONY: server
server:
	browser-sync start --server --files='index.html,bundle/app.css,js/app.js,build/app.js'

.PHONY: all
all:
	(make css & make js & make server & wait)

.PHONY: clean
clean:
	rm -r bundle
	rm -r build