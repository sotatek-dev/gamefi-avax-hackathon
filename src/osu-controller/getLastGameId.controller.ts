const Game_osu = require('../models/game_osu')

export async function getLastGameId() {
    let id = await Game_osu.max('id')
    return {data: id}
}