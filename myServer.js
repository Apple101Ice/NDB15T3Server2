const express = require('express')
const app = express()
const port = process.env.PORT || 2410
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`Node app listening on port ${port}!`))

const baseURL = 'https://ndb15t3server1.onrender.com'

app.post('/fetchData', async function (req, res) {
    const { method, fetchURL, data } = req.body
    try {
        let response = ''
        if (method === 'GET') {
            response = await axios.get(baseURL + fetchURL)
        }
        else if (method === 'POST') {
            response = await axios.post(baseURL + fetchURL, data)
        }
        res.send(response.data)
    } catch (error) {
        if (error.response) {
            let { status, statusText } = error.response
            res.status(status).send(statusText)
        }
        else
            res.status(404).send(error)
    }
})