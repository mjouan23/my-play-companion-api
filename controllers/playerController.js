const Player = require('../models/player')(global.dbConnection)

exports.createPlayer = async (req, res, next) => {
    try {
        const username = req.body.username

        player = new Player({
            username: username
        })

        await player.save()

        res.status(201).json({ status: 201, message: 'The player created successfully.', data: player })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ status: res.statusCode, message: 'The player could not be created.', error: error })
    }
}