const path = require('path')
const { spawn } = require('child_process')
let PythonProcess = null

function _callPythonProcess(server, cb) {
    const { ipAddress, port } = server

    const absolutePath = path.resolve(__dirname)

    PythonProcess = spawn('python', [`${absolutePath}/sfcheck.py`, ipAddress, `-p ${port}`, '-c'])

    PythonProcess.stdout.on('data', function (data) {
        const response = data.toString()
    
        if (response === 'Connection timed out.\n') {
            return cb('Unable to connect to server', null)
        } else {
            const splitResponse = response.split(',')

            const preppedResponse = {
                responseTimeInMsec: splitResponse[0],
                serverState: splitResponse[1],
                serverVersion: splitResponse[2].replace(/\n/g, ''),
            }

            return cb(null, preppedResponse)
        }
    })
}

module.exports = {
    byIp: (ipAddress, port = 15777) => new Promise((resolve, reject) => {
        if (!ipAddress) reject('The IP Address/hostname is required')
    
        _callPythonProcess({ ipAddress, port }, function (err, res) {
            if (err) {
                console.error('_callPythonProcess', err)
                return reject(err)
            }
            
            const response = {
                ipAddress,
                port,
                ...res
            }
    
            return resolve(response)
        })
    })
}