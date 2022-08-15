const Game_chess = require('../models/game_chess')

export async function getAmountInGame(game_id) {
    const rows = await Game_chess.findOne({
        where: { game_id: game_id },
      });
    return {data: rows}
}