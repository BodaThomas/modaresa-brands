const express = require('express')
const app = express()
const port = 3001

app.set('PORT', process.env.PORT || port)
app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.use('/', require('./src/routes/brands.route'))

app.listen(app.get('PORT'), () => {
    console.log(`Server running on port ${app.get('PORT')}`)
})

module.exports = app
