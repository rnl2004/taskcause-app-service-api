import router from '../config/express_router'
import authenticate from '../config/authenticate'
import organizationService from '../services/organization_service'
import commonUtils from '../commons/utils'

router.post('/organizations', (req, res) => {
	const organization = req.body
	organizationService.createOrganizationTransactional(organization).then((result) => {
		res.send(result)
	})
})

router.put(`/organizations`, (req, res) => {
	const organization = req.body
	organizationService.updateOrganizationTransactional(organization).then((result) => {
		res.send(result)
	})
})

router.get(`/organizations/:id`, (req, res) => {
	const data = req.body
	const organizationId = req.params.id
	organizationService.getOrganizationTransactional(organizationId).then((result) => {
		res.send(result)
	})
})

router.get(`/organizations`, (req, res) => {
	const data = req.body
	organizationService.getOrganizationsTransactional().then((result) => {
		res.send(result)
	})
})

export default router
