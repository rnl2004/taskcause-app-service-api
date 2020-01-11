/*
import database from '../config/database'
import Promise from 'bluebird'

const userService = function() {
    this.getUser = function(userId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT u.id `userId`, u.loginName, u.firstName, u.lastName, u.middleName, ' +
                'u.branchId FROM user AS u WHERE u.id = ?'
            const dataParam = [userId]
            database.query(sql, dataParam,function(err, rows) {
                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }
            })
        })
    }
}
module.exports = new userService()
*/
