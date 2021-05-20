

  async function findByUserName(db, user_name) {
    return db('catan_players')
      .select('*')
      .where({user_name})
      .first();
  };
  async function findUserById(db, id) {
    return db('catan_players')
      .select('*')
      .where({id})
      .first();
  };
  async function addWinToPlayer(db, user) {
    const id = user.id;
    user.wins++;
    user.games_played++;
    return db('catan_players').update(user).where({id});
  };
  async function addLossToPlayer(db, user) {
    const id = user.id;
    user.games_played++;
    return db('catan_players').update(user).where({id});
  };
  async function getAllPlayers(db) {
    return db('catan_players')
      .select('*');
  };

  async function insertPlayer(db, player) {
    return db('catan_players').insert(player).returning('*');
  }

  async function getPlayerStats(req, res) {
    const playersArray = [];
    const response = {}
    try {
      const players = await getAllPlayers(req.app.get('db'))
      players.forEach(player=> {
        if(player.games_played > 0) {
          player.win_pct = player.wins / player.games_played;
        } else { player.win_pct = 0}

      });
      response.players = players;
      return res.json(response);
    } catch(e){
      console.error(e.message);
    }

  };

  async function addPlayer(req, res) {
    let player
    try{
      const db = req.app.get('db');
      player = req.body;
      insertPlayer(db, player);
    } catch(e) {
      console.error(e);
      res.status(500).send("ERROR");
    }
    res.json(player);
  }

module.exports = {findByUserName, findUserById, addWinToPlayer, addLossToPlayer, getAllPlayers, getPlayerStats, addPlayer};