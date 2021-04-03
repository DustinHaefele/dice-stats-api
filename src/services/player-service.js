
const PlayerService = {
  findByUserName(db, user_name) {
    console.log({user_name});
    return db('catan_players')
      .select('*')
      .where({user_name})
      .first();
  },
  addWinToPlayer(db, userName) {
    const user = this.findByUserName(db, userName);
    user.wins++; 
    return db('catan_players').update(user).where('id', user.id);
  }


};

module.exports = PlayerService;