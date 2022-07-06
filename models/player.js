const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = (dbConnection) => {
    const playerSchema = new Schema(
        {
            username: {
                type: String,
                required: true
            }
        }, {timestamps: true}
    );


    // On supprime le modèle Player qui a déjà été instancié pour ne pas le définir plusieurs fois
    // Fixe l'erreur : "Cannot overwrite `Player` model once compiled."
    if (dbConnection) {
        delete dbConnection.models['Player']
        return dbConnection.model('Player', playerSchema)
    }

    return null
}