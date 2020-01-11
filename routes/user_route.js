/*
import router from '../config/express_router'
import database from '../config/database'
import authenticate from '../config/authenticate'
import userService from '../services/user_service'

router.get('/user/:userId/permission/:permissionId', authenticate(), (req, res) => {
    const sql = 'SELECT u.id `userId`, u.loginName, p.name `permissionName`, pr.* FROM user AS u ' +
        'LEFT JOIN permission_rights AS pr ON u.id = pr.userId ' +
        'LEFT JOIN permission AS p ON pr.permissionId = p.id ' +
        'WHERE u.id = ? and p.id = ?'
    const dataParam = [req.params.userId, req.params.permissionId]
    database.query(sql, dataParam, function (err, rows) {
        res.send(rows)
    })
})

router.post('/user/authenticate', authenticate(), (req, res) => {
    const sql = 'SELECT u.id, u.loginName, u.firstName, u.lastName, u.middleName, u.status, ' +
        'b.id `branchId`, b.name, b.address FROM user AS u ' +
        'LEFT JOIN branch AS b ON u.branchId = b.id ' +
        'WHERE u.loginName = ? and u.password = ?'
    const data = req.body
    const dataParam = [data.loginName, data.password]
    database.query(sql, dataParam, function (err, rows) {
        res.send(rows)
    })
})

router.get('/user/:userId', authenticate(), (req, res) => {
    const userId = req.params.userId
    userService.getUser(userId).then(function (result) {
        res.send(result)
    })
})
// Service with Promise testing...............
router.get('/user/:userId/test', (req, res) => {
    const userId = req.params.userId
    userService.getUser(userId).then(function (result) {
        res.send(result)
    })
})

export default router
*/
