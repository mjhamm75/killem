create database killem;

create table users (id serial, user_name varchar(50), playlist_id varchar(100), access_token varchar, refresh_token varchar);

GRANT ALL PRIVILEGES ON TABLE users TO killem;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO killem;	