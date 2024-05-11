-- CREATE DATABASE mygameslist;

CREATE TABLE Platform(
    name VARCHAR(50) PRIMARY KEY,
    manufacturer VARCHAR(50),
    release_date DATE
);

CREATE TABLE Game(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    release_date DATE,
    description TEXT,
    publisher VARCHAR(50),
    developer VARCHAR(50),
    genre VARCHAR(50),
    star_rating DECIMAL(2,1)
);

CREATE TABLE Platform_Game(
    platform_name VARCHAR(50),
    game_id INT,
    PRIMARY KEY(platform_name, game_id),
    FOREIGN KEY(platform_name) REFERENCES Platform(name),
    FOREIGN KEY(game_id) REFERENCES Game(id)
);

CREATE TABLE Users(
    username VARCHAR(50) PRIMARY KEY,
    hashed_password VARCHAR(60),
    email VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE Review(
    id SERIAL PRIMARY KEY,
    game_id INT,
    username VARCHAR(50),
    rating DECIMAL(2,1),
    review TEXT,
    likes INT,
    FOREIGN KEY(game_id) REFERENCES Game(id),
    FOREIGN KEY(username) REFERENCES Users(username)
);

CREATE TYPE Status AS ENUM('Playing', 'Completed', 'Retired', 'Wishlist');

CREATE TABLE Plays(
    username VARCHAR(50),
    game_id INT,
    status Status,
    PRIMARY KEY(username, game_id),
    FOREIGN KEY(username) REFERENCES Users(username),
    FOREIGN KEY(game_id) REFERENCES Game(id)
);