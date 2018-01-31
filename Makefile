export PATH := node_modules/.bin:$(PATH)

.PHONY: deploy

deploy:
	ask deploy
