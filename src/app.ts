import logger from "./logging/logger";

function main(name?: string) {
	logger.log(
		'debug',
		`hello ${name ? name : 'world'}`
	)
}

main()