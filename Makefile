.PHONY: setup dev build lint format

setup:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npx prettier --check "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"

format:
	npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"
