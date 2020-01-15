const environment = function() {

	const deployment_environment = process.env.DEPLOYMENT_ENVIRONMENT;

	this.server = function () {
		return { environment: deployment_environment, hostname: 'localhost', port: 3000 }
	}

	this.database = function () {
		return {
			server: '192.168.10.11',
			port: 3306,
			server_debug: true,
			database: 'taskcausedb',
			username: 'root',
			password: 'Clippers1',
			connection_limit: 10,
			wait_for_connections: true
		}
	}
}
module.exports = new environment()
