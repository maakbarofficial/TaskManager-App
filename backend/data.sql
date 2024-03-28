CREATE DATABASE taskmanager;

CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
)

INSERT INTO todos
(id, user_email, title, progress, date) VALUES(0, 'akbar@akbar.com', 'Test first todo', 60, 'Thu Mar 28 2024 20:11:26 GMT+0500 (Pakistan Standard Time)');
