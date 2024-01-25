.SHELL := /usr/bin/bash

app-start:
	npm run build
	npm run exec
