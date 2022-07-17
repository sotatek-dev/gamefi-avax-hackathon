const Game_tic_tac_toe = require('../models/game_tic_tac_toe')

export async function doUpdateGame(address, amount, game_id, message, signature, winner) {
  let rows = await Game_tic_tac_toe.findAll({
    where: {
        game_id: game_id
    },
  })
  if (!address && !amount && !message && !signature) {
    await Game_tic_tac_toe.update(
      {
        winner: winner
      },
      {
        where: { game_id: game_id },
      }
    );
    return {'success': true, status: 200, message: 'game_tic_tac_toe updated'}
  }
  if (rows[0] == undefined) {
    await Game_tic_tac_toe.create({
      player_1: address, 
      game_id: game_id, 
      amount: amount, 
      message_player_1: message, 
      signature_player_1: signature
    });
    return {'success': true, status: 200, msg: 'Insert game_tic_tac_toe successfully'}
  } else {
    await Game_tic_tac_toe.update(
      {
        player_2: address, 
        message_player_2: message, 
        signature_player_2: signature,
        winner: winner
      },
      {
        where: { game_id: game_id },
      }
    );
    return {'success': true, status: 200, message: 'game_tic_tac_toe updated'}
  }
}