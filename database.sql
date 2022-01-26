-- To create database
CREATE DATABASE baseball;

----------------------- COMMANDS TO CREATE TABLE ------------------------------------

-- To create players table
CREATE TABLE players ( 
    personnel_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth VARCHAR(30) NOT NULL,
    batting_orientation VARCHAR(5) NOT NULL,
    CONSTRAINT batting_orientation_constraint CHECK (batting_orientation= 'left' OR batting_orientation= 'right' OR batting_orientation= 'switch') ,
    batting_average FLOAT8 
    );


-- To create coaches table
CREATE TABLE coaches ( 
    personnel_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth VARCHAR(30) NOT NULL
    );



-- To create managers table
CREATE TABLE managers ( 
    personnel_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth VARCHAR(30) NOT NULL
    );



-- To create umpires table
CREATE TABLE umpires ( 
    personnel_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth VARCHAR(30) NOT NULL
    );



-- To create teams table
CREATE TABLE teams ( 
    team_name VARCHAR(50) NOT NULL PRIMARY KEY,
    city VARCHAR(50) NOT NULL, 
    division VARCHAR(50) NOT NULL,
    league VARCHAR(50) NOT NULL,
    manager_id BIGINT NOT NULL REFERENCES manager(personnel_id)
    );




-- To create teams coaches table
CREATE TABLE team_coaches ( 
    team_name VARCHAR(50) NOT NUll REFERENCES teams(team_name),
    coach_id BIGINT NOT NUll REFERENCES coaches(personnel_id),
    PRIMARY KEY (team_name, coach_id)
    );


-- To create teams players table
CREATE TABLE team_players ( 
    team_name VARCHAR(50) NOT NUll REFERENCES teams(team_name),
    player_id BIGINT NOT NUll REFERENCES players(personnel_id),
    PRIMARY KEY (team_name, player_id)
    );


-- To create games table
CREATE TABLE games ( 
    id BIGSERIAL NOT NULL PRIMARY KEY,
    home_team VARCHAR(50) NOT NUll, 
    visiting_team VARCHAR(50) NOT NUll,
    date_of_game DATE NOT NULL,
    winner VARCHAR(50) NOT NULL,
    winning_pitcher VARCHAR(50),
    loosing_pitcher VARCHAR(50),
    save_pitcher VARCHAR(50)
    );

-- insert into games
INSERT INTO games(home_team, visiting_team, date_of_game, winner, winning_pitcher, loosing_pitcher, save_pitcher)
VALUES ('DeadEyes', 'DeadEyes1', DATE '2021-01-04', 'DeadEyes', 'ram', 'shyam');

-- To create scores table
CREATE TABLE scores ( 
    team_name VARCHAR(50) NOT NUll,
    game_id BIGINT NOT NUll,
    runs INT NOT NULL, 
    hits INT NOT NULL,
    errors INT,  
    PRIMARY KEY (team_name, game_id)
    );



-- To create hits_by_player table
CREATE TABLE hits_by_player ( 
    singles INT, 
    doubles INT,
    triples INT,
    home_runs INT,    
    player_id BIGINT NOT NUll,
    game_id BIGINT NOT NUll ,
    PRIMARY KEY (player_id, game_id)
    );


-----------------------------COMMANDS TO INSERT INTO TABLES ----------------------------------------------


-- insert into players
INSERT INTO players(first_name, last_name, date_of_birth, place_of_birth, batting_orientation, batting_average)
VALUES ('ram', 'paudel', DATE '1996-07-08', 'kathmandu', 'left', 10);


-- insert into coaches
INSERT INTO coaches(first_name, last_name, date_of_birth, place_of_birth)
VALUES ('simon', 'paudel', DATE '1996-07-08', 'dhangadi');


-- insert into managers
INSERT INTO managers(first_name, last_name, date_of_birth, place_of_birth)
VALUES ('simon', 'chaudhary', DATE '1993-07-08', 'pokhara');



-- insert into umpires
INSERT INTO umpires(first_name, last_name, date_of_birth, place_of_birth)
VALUES ('Prakash', 'bidari', DATE '1995-07-08', 'kathmandu');



-- insert into teams
INSERT INTO teams(team_name, city, division, league, manager_id)
VALUES ('Dead eyes', 'kathmandu','A', 'champions', 2);



-- insert into scores
INSERT INTO scores(team_name, game_id, runs, hits, errors)
VALUES ('DeadEyes', '1', 100, 20, 2);


-- insert into hits by player
INSERT INTO hits_by_player(singles, doubles, triples, home_runs, player_id, game_id)
VALUES (10, 6, 3, 20, 2 , 1);

