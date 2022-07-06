require('dotenv').config();
const path = require('path');
const express = require('express');

const db = require('./util/db');
const app = express();

global.dbConnection = db.getDbConnection();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

try {
    app
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(express.static(path.join(__dirname, 'public')))
        .use(require('./routes/main'))
        .use(require('./routes/player'))
        .use(require('./routes/game'))

    app.listen(process.env.PORT_HTTP, function () {
        console.log(`Express app listening on port ${process.env.PORT_HTTP}`)
    })
} catch (error) {
    console.log('error', error)
}