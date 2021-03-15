const router = require('express').Router()
const brands = require('../controllers/brands.controller')

router.post('/addBrand', brands.addBrand)
router.get('/getBrands', brands.getBrands)
router.delete('/deleteBrand', brands.deleteBrand)
router.get('/getTypes', brands.getTypes)

module.exports = router
