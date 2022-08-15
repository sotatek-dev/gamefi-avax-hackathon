const Game_osu = require('../models/game_osu')

export async function doUpdateGame(address, amount) {
    await Game_osu.create({
        player: address,
        balance: amount,
    });
    return { 'success': true, status: 200, message: 'Balance updated' }
}
