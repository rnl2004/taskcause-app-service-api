import Promise from 'bluebird'
import dateFormat from 'dateformat'

const commonUtils = function() {

	this.getCurrentDateTime = function () {
		const now = new Date()
		const pattern = 'yyyy-mm-dd\'T\'HH:MM:ss'
		return { 'now': dateFormat(now, pattern) }
	}

	this.formatDateTime = function (date) {
		const now = new Date(date)
		const pattern = 'yyyy-mm-dd\'T\'HH:MM:ss'
		return { 'toTimestamp': dateFormat(now, pattern) }
	}

	this.commitTransaction = function (connection) {
		return new Promise(function (resolve, reject) {
			connection.commit(function (err) {
				if (err) {
					connection.rollback(function () {
						reject(err.message)
						connection.release()
					})
				}
				resolve({message: 'Transaction Completed.'})
				connection.release()
			})
		})
	}

}
module.exports = new commonUtils()
