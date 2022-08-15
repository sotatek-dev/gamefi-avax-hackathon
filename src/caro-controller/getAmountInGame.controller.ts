const Game_tic_tac_toe = require('../models/game_tic_tac_toe')

export async function getAmountInGame(game_id) {
    const rows = await Game_tic_tac_toe.findOne({
        where: { game_id: game_id },
      });
    return {data: rows}
}