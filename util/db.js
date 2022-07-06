const mongoose = require('mongoose');
require('dotenv').config()

const clientOption = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    // reconnectTries: 30000
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const getDbConnection = () => {
    const db = mongoose.createConnection(process.env.MONGODB_URI, clientOption)
    db.on("error", console.error.bind(console, "Connection => Error>> : "))
    db.once("open", function () {
        console.log("Connection " + db.name + " => Ok !")
    })
    return db
}
exports.getDbConnection = getDbConnection