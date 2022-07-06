const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = (dbConnection) => {
    const gameSchema = new Schema({
        code_game: {
            type: Number,
            min: 6,
            max: 6
        },
        players_list: [
            {
                _id: false,
                player_id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Player'
                },
                player_num: Number,
                configuration: Object
            }
        ],
        default_configuration: Object
    }, { timestamps: true });

    // Generate Code Game before save
    gameSchema.pre('save', async function (next) {
        this.code_game = Math.floor(100000 + Math.random() * 900000);
    });

    // On supprime le modèle Game qui a déjà été instancié pour ne pas le définir plusieurs fois
    // Fixe l'erreur : "Cannot overwrite `Game` model once compiled."
    if (dbConnection) {
        delete dbConnection.models['Game'];
        return dbConnection.model('Game', gameSchema);
    }
    
    return null
}