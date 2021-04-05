
const utils = {
  parsePostgresHost(connectionString) {
    const hostString = connectionString.slice(11,connectionString.length);
    const hostArray = hostString.split(':').join('/').split('@').join('/').split('/');
    if(hostArray.length === 3 ){
      const [user, host, database] = hostArray;
      return {user, host, port: 5432, database, ssl: false};
    }
    const [user, password, host, port, database] = hostArray;
    return {user, password, host, port, database, ssl: { rejectUnauthorized: false }};
  }
};

module.exports = utils;