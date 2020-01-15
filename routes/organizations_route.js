const router = require('../config/express_router')

const organizationsService = require('../services/organizations_service');

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
	const organizationId = req.params.id
	organizationsService.getOrganizationTransactional(organizationId).then((result) => {
		res.send(result)
	})
})

router.get(`/organizations`, (req, res) => {
	organizationsService.getOrganizationsTransactional().then((result) => {
		res.send(result)
	})
})

module.exports = router
