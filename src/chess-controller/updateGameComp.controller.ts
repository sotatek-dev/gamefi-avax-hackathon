const Game_chess = require('../models/game_chess')

export async function doUpdateGame(address, amount, game_id, message, signature, winner) {
  console.log(game_id, 'doUpdateGame');
  let rows = await Game_chess.findAll({
    where: {
        game_id: game_id
    },
  })
  if (!address && !amount && !message && !signature) {
    await Game_chess.update(
      {
        winner: winner
      },
      {
        where: { game_id: game_id },
      }
    );
    return {'success': true, status: 200, message: 'game_chess updated'}
  }
  if (rows[0] == undefined) {
    await Game_chess.create({
      player_1: address, 
      game_id: game_id, 
      amount: amount, 
      message_player_1: message, 
      signature_player_1: signature
    });
    return {'success': true, status: 200, msg: 'Insert game_chess successfully'}
  } else {
    await Game_chess.update(
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
    return {'success': true, status: 200, message: 'game_chess updated'}
  }
}