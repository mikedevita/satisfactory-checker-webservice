const express = require('express')
const StatusCheck = require('./lib/statuscheck')
const config = require('./config')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/statuscheck', (req, res) => {
    let {
        ipAddress,
        port
    } = req.body

    if (!ipAddress) return res.status(400).send({ msg: 'No IP address provided' })

    StatusCheck.byIp(ipAddress, port)
    .then((_res) => {
        return res.send(_res)
    })
    .catch((err) => {
        console.error({ ipAddress, port, msg: err })
        return res.status(503).send({ ipAddress, port, msg: err })
    })
    
})

app.listen(config.httpserver.port, () => {
    console.log(`StatusCheck proxy listening at http://${config.httpserver.ipAddress}:${config.httpserver.port}`)
})