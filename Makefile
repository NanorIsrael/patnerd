.SHELL := /usr/bin/bash

app-start:
	rm -r deploy/
	npm run build
	npm run exec
