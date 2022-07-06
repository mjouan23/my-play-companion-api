const Game = require('../models/game')(global.dbConnection);

exports.getGames = async (req, res, next) => {
    try {
        const games = await Game.find();
        res.status(200).json({ status: 200, message: 'The games retrieved successfully.', data: games });
    } catch (err) {
        console.log('error', err)
        res.status(500).json({ status: 500, message: 'The games could not be retrieved.', error: error });
    }
}

exports.getGame = async (req, res, next) => {
    try {
        const codeGame = req.params.code_game || req.query.code_game

        const game = await Game.findOne({ code_game: codeGame});
        res.status(200).json({ status: 200, message: 'The game retrieved successfully.', data: game });

    } catch (err) {
        console.log('error', err)
        res.status(500).json({ status: 500, message: 'The games could not be retrieved.', error: error });
    }
}

exports.createGame = async (req, res, next) => {
    try {
        
        const player_id = req.body.player_id;

        const game = new Game({
            players_list: [{
                player_id: player_id,
                player_num: 0
            }]
        });

        await game.save()

        res.status(201).json({ status: 201, message: 'The game created successfully.', data: game })

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ status: res.statusCode, message: 'The game could not be created.', error: error })
    }
}

exports.updateGame = async (req, res, next) => {
    try {
        const code_game = req.body.code_game
        
        game = await Game.findOneAndUpdate(
            {code_game: code_game}, 
            {default_configuration: default_configuration}
        )

        res.status(201).json({ status: 201, message: 'The player added successfully.' })

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ status: res.statusCode, message: 'The game could not be created.', error: error })
    }
}


exports.addPlayer = async (req, res) => {
    try {
        const codeGame = req.body.code_game;
        const playerId = req.body.player_id;
        console.log('codeGame', code_game);
        console.log('playerId', playerId);
        currentGame = await Game.findOne({ code_game: codeGame }).select('players_list');
        playersList = currentGame.players_list;
        
        // Pick up the players
        lastNumPlayer = Math.max(...playersList.map(player => player.player_num));
        lastNumPlayer = lastNumPlayer + 1;
        const playerAdd = { player_id: playerId, player_num: lastNumPlayer++ }

        game = await Game.findOneAndUpdate(
            {code_game: codeGame }, 
            {$push: {players_list: playerAdd}}
        )

        res.status(201).json({ status: 201, message: 'The player added successfully.' })

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ status: res.statusCode, message: 'The player could not be added.', error: error })
    }
}