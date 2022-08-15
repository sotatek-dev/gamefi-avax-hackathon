const User = require('../models/user')

async function updateBalance(address, balance) {
  const rows = await User.findOne({
    where: { address: address },
  });
  if (!rows) {
    await User.create({
      address: address, 
      balance: balance, 
    });
    return {'success': true, status: 200, message: 'New user created'}
  } else {
    await User.update(
      {
        balance: balance
      },
      {
        where: { address: address },
      }
    );
    return {'success': true, status: 200, message: 'Balance updated'}
  }
}

module.exports = {
  updateBalance
}