const Game_chess = require('../models/game_chess')

export async function getLastGameId() {
    let id = await Game_chess.max('id')
    console.log(id);
    return {data: id}
}