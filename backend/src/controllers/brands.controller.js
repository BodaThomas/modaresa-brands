let brandsList = []
const brand = {
    name: new String(),
    createdAt: new Date(),
    type: new Array(),
    country: new String()
}

exports.addBrand = (req, res) => {
    const newBrand = Object.create(brand)

    if (!req.body || !req.body.name || !req.body.type || !req.body.country) {
        res.status(400).json({
            message: 'Bad request. Some parameters are missing.'
        })
        return -1
    }
    newBrand.name = req.body.name
    newBrand.type = req.body.type
    newBrand.country = req.body.country
    if (req.body.description)
        newBrand.description = req.body.description
    brandsList.push(newBrand)
    console.log(newBrand)
    res.status(200).json({
        success: true
    })
    return
}

exports.getBrands = (_, res) => {
    res.status(200).json({
        brands: brandsList
    })
    return brandsList
}

exports.deleteBrand = (req, res) => {
    console.log(req, res)
    return
}

