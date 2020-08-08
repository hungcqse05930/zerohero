const fs = require('fs')

// environment variables only, database config
const { createApp } = require('./src/app')
const {
    // env port config
    PORT = 3003,
    
    // db config
    // db address
    // HOST = '35.240.192.232',
    HOST = '34.87.83.81',
    // HOST = 'localhost',
    DB_USER = 'tddakk',
    // DB_USER = 'root',
    DB_PASS = '0mqMw0Gis8I5zi2v',
    // DB_PASS = '123456',
    DB_NAME = 'semo_2.0',
    
    // SSL config
    DB_SSL_CA = fs.readFileSync('./ssl/server-ca.pem'),
    DB_SSL_CERT = fs.readFileSync('./ssl/client-cert.pem'),
    DB_SSL_KEY = fs.readFileSync('./ssl/client-key.pem')
} = process.env

// by doing this, app needs not to be initiated first, we can put vars into it
const appOptions = {
    database: {
        dbHost: HOST,
        dbUser: DB_USER,
        dbPass: DB_PASS,
        dbName: DB_NAME,
        dbSslCa: DB_SSL_CA,
        dbSslCert: DB_SSL_CERT,
        dbSslKey: DB_SSL_KEY
    }
}

// createApp now returns a Promise because it is an async func
module.exports = createApp(appOptions)
    .then((app) => {
        // So we need to wrap the `app.listen` inside a `.then`
        app.listen(PORT, () => {
            console.info(`App is running at ${PORT}`)
        })
    }).catch(error => {
        console.log(error.message)
    })
