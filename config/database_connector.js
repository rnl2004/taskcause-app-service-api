const mysql = require('mysql')
const env = require('./environment')

let connectionPool = null

const DatabaseConnection = function () {

	this.getConnection = (cb) => {
		const db_server = env.database().server
		const db_server_port = env.database().port
		const db_server_debug = env.database().server_debug
		const database = env.database().database
		const db_user = env.database().username
		const db_password = env.database().password
		const db_connection_limit = env.database().connection_limit
		const db_wait_for_connections = env.database().waitForConnections
		if (!connectionPool) {
			connectionPool = mysql.createPool({
				connectionLimit: db_connection_limit,
				host: db_server,
				port: db_server_port,
				database: database,
				user: db_user,
				password: db_password,
				debug: db_server_debug,
				waitForConnections: db_wait_for_connections
			})
			if (connectionPool) {
				const msg = `Connected to database.`
				console.log(msg)
			}
		}
		if (connectionPool) {
			connectionPool.getConnection((err, connection) => {
				if (err) {
					const msg = `Error: Failed to connect database. ${err}`
					console.log(msg)
					return cb(err)
				}
				const msg = `Connection pool with thread id: ${connection.threadId}`
				console.log(msg)
				cb(null, connection)
			})
		}
	}
}

module.exports = new DatabaseConnection()

