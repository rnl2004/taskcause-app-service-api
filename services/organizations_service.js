const database = require('../config/database_connector')
const Promise = require('promise')
const commonUtils = require('../commons/utils')

const organizationsService = function () {

	this.createOrganizationTransactional = (organization) => {
		organization.created_date = commonUtils.getCurrentDateTime().now
		organization.updated_date = commonUtils.getCurrentDateTime().now
		return new Promise((resolve, reject) => {
			database.getConnection((err, connection) => {
				connection.beginTransaction((err) => {
					if (err) {
						reject(err)
						connection.release()
					}
				})
				this.createOrganization(connection, organization).then((organization_cb) => {
					commonUtils.commitTransaction(connection).then((commit_cb) => {
						resolve({id: organization_cb.insertId, message: commit_cb.message}) //Overwrite commit callback value
					}).catch((error) => {
						resolve({message: error})
					})
				}).catch((error) => {
					resolve({message: error})
				})
			})
		})
	}

	this.updateOrganizationTransactional = (organization) => {
		organization.created_date = commonUtils.formatDateTime(organization.created_date).toTimestamp
		organization.updated_date = commonUtils.getCurrentDateTime().now
		return new Promise((resolve, reject) => {
			database.getConnection((err, connection) => {
				connection.beginTransaction((err) => {
					if (err) {
						reject(err)
						connection.release()
					}
				})
				this.updateOrganization(connection, organization).then((organization_cb) => {
					commonUtils.commitTransaction(connection).then((commit_cb) => {
						resolve({id: organization_cb, message: commit_cb.message}) //Overwrite commit callback value
					}).catch((error) => {
						resolve({message: error})
					})
				}).catch((error) => {
					resolve({message: error})
				})
			})
		})
	}

	this.getOrganizationTransactional = (organizationId) => {
		return new Promise((resolve, reject) => {
			database.getConnection((err, connection) => {
				connection.beginTransaction((err) => {
					if (err) {
						reject(err)
						connection.release()
					}
				})
				this.getOrganizationById(connection, organizationId).then((organization_cb) => {
					commonUtils.commitTransaction(connection).then((commit_cb) => {
						resolve({data: organization_cb, message: commit_cb.message})
					}).catch((error) => {
						resolve({message: error})
					})
				}).catch((error) => {
					resolve({message: error})
				})
			})
		})
	}

	this.getOrganizationsTransactional = () => {
		return new Promise((resolve, reject) => {
			database.getConnection((err, connection) => {
				connection.beginTransaction((err) => {
					if (err) {
						reject(err)
						connection.release()
					}
				})
				this.getOrganizations(connection).then((organization_cb) => {
					commonUtils.commitTransaction(connection).then((commit_cb) => {
						resolve({data: organization_cb, message: commit_cb.message})
					}).catch((error) => {
						resolve({message: error})
					})
				}).catch((error) => {
					resolve({message: error})
				})
			})
		})
	}

	this.createOrganization = (connection, organization) => {
		return new Promise((resolve, reject) => {
			const sql = 'INSERT INTO tbl_manage_organization SET ?'
			connection.escape(organization)
			connection.query(sql, organization, (err, result) => {
				if (err) {
					connection.rollback(() => {
						reject(err.message)
						connection.release()
					})
				} else {
					resolve(result)
				}
			})
		})
	}

	this.updateOrganization = (connection, organization) => {
		return new Promise((resolve, reject) => {
			const sql = 'UPDATE tbl_manage_organization SET ? where organization_id = ?'
			connection.escape(organization)
			connection.query(sql, [organization, organization.organization_id], (err, result) => {
				if (err) {
					connection.rollback(() => {
						reject(err.message)
						connection.release()
					})
				} else {
					resolve(result)
				}
			})
		})
	}

	this.getOrganizationById = (connection, organizationId) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM tbl_manage_organization where organization_id = ?'
			connection.escape(organizationId)
			connection.query(sql, [organizationId], (err, result) => {
				if (err) {
					connection.rollback(() => {
						reject(err.message)
						connection.release()
					})
				} else {
					resolve(result)
				}
			})
		})
	}

	this.getOrganizations = (connection) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM tbl_manage_organization'
			connection.query(sql, [], (err, result) => {
				if (err) {
					connection.rollback(() => {
						reject(err.message)
						connection.release()
					})
				} else {
					resolve(result)
				}
			})
		})
	}
}

module.exports = new organizationsService()
