
const PlayerService = {
  findByUserName(db, user_name) {
    return db('catan_players')
      .select('*')
      .where({user_name})
      .first();
  },
  findUserById(db, id) {
    return db('catan_players')
      .select('*')
      .where({id})
      .first();
  },
  addWinToPlayer(db, user) {
    const id = user.id;
    user.wins++;
    user.games_played++;
    return db('catan_players').update(user).where({id});
  },
  addLossToPlayer(db, user) {
    const id = user.id;
    user.games_played++;
    return db('catan_players').update(user).where({id});
  }


};

module.exports = PlayerService;