const environment = function() {

	const deployment_environment = process.env.DEPLOYMENT_ENVIRONMENT;

	this.deploymentServer = function () {
		if (deployment_environment === 'DEV') {
			return { environment: deployment_environment, server: '192.168.10.11', port: 3000 }
		} else if (deployment_environment === 'TEST') {
			return { environment: deployment_environment, server: '192.168.10.12', port: 3000 }
		} else if (deployment_environment === 'PROD') {
			return { environment: deployment_environment, server: '192.168.10.13', port: 3000 }
		} else {
			return { environment: deployment_environment, server: 'localhost', port: 3000 }
		}
	}

	this.datatabase = function () {
		return {
			server: '192.168.10.11',
			port: 3306,
			server_debug: true,
			database: 'taskcausedb',
			username: 'root',
			password: 'Clippers1',
			connection_limit: 10
		}
	}
}
module.exports = new environment()
