DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  winner INTEGER REFERENCES catan_players(id) ON DELETE CASCADE NOT NULL ,
  two INTEGER NOT NULL,
  three INTEGER NOT NULL,
  four INTEGER NOT NULL,
  five INTEGER NOT NULL,
  six INTEGER NOT NULL,
  seven INTEGER NOT NULL,
  eight INTEGER NOT NULL,
  nine INTEGER NOT NULL,
  ten INTEGER NOT NULL,
  eleven INTEGER NOT NULL,
  twelve INTEGER NOT NULL
);
