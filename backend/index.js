const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.set('PORT', process.env.PORT || port)
app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.use('/', require('./src/routes/brands.route'))

app.listen(app.get('PORT'), () => {
    console.log(`Server running on port ${app.get('PORT')}`)
})

module.exports = app
