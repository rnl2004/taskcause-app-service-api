import router from '../config/express_router'
import authenticate from '../config/authenticate'
import organizationsService from '../services/organizations_service'
import commonUtils from '../commons/utils'

router.post('/organizations', (req, res) => {
	const organization = req.body
	organizationsService.createOrganizationTransactional(organization).then((result) => {
		res.send(result)
	})
})

router.put(`/organizations`, (req, res) => {
	const organization = req.body
	organizationsService.updateOrganizationTransactional(organization).then((result) => {
		res.send(result)
	})
})

router.get(`/organizations/:id`, (req, res) => {
	const data = req.body
	const organizationId = req.params.id
	organizationsService.getOrganizationTransactional(organizationId).then((result) => {
		res.send(result)
	})
})

router.get(`/organizations`, (req, res) => {
	const data = req.body
	organizationsService.getOrganizationsTransactional().then((result) => {
		res.send(result)
	})
})

export default router
