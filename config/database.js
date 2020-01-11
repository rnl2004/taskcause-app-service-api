import mysql from 'mysql'
import env from '../commons/environment'

let connectionPool = null

const getConnection = (cb) => {
	const db_server = env.datatabase().server
	const db_server_port = env.datatabase().port
	const db_server_debug = env.datatabase().server_debug
	const database = env.datatabase().database
	const db_user = env.datatabase().username
	const db_password = env.datatabase().password
	const db_connection_limit = env.datatabase().connection_limit
	if (!connectionPool) {
		connectionPool = mysql.createPool({
			connectionLimit: db_connection_limit,
			host: db_server,
			port: db_server_port,
			database: database,
			user: db_user,
			password: db_password,
			debug: db_server_debug
		})
	}
	if (connectionPool) {
		connectionPool.getConnection((err, connection) => {
			if (err) {
				const msg = `Error: Failed to connect database. ${err}`
				console.log(msg)
				return cb(err)
			}
			const msg = `Status: Successfully connected to database with thread id ${connection.threadId}`
			console.log(msg)
			cb(null, connection)
		})
	}
}

export default {
	getConnection: getConnection
}