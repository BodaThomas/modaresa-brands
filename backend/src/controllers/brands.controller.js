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
    newBrand.country = req.body.country,
    newBrand.createdAt = new Date()
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
    let index

    if (!req.query.name) {
        res.status(400).json({
            message: 'Bad request. You need to provide a brand name in the query.'
        })
        return
    }
    index = brandsList.find(element => element.name === req.query.name)
    if (index === -1) {
        res.status(400).json({
            message: 'You try to delete an non-existent brand.'
        })
        return
    }
    brandsList.splice(index, 1)
    res.status(200).json({
        message: 'Brand successfully deleted.'
    })
    return
}

exports.getTypes = (_, res) => {
    const types = ['shoes', 'clothes', 'bags', 'hats', 'accessories']

    res.status(200).json({
        types
    })
    return
}
