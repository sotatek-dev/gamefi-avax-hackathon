const Game_tic_tac_toe = require('../models/game_tic_tac_toe')

export async function getLastGameId() {
    let id = await Game_tic_tac_toe.max('id')
    console.log(id);
    return {data: id}
}