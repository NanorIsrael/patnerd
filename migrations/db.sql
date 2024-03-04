CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- creates user table
DROP TABLE IF EXISTS accounts CASCADE;
CREATE TABLE account (
  	id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255),
	time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

-- user_tokens
DROP TABLE IF EXISTS user_tokens;
CREATE TABLE user_tokens (
	session_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
	reset_token VARCHAR(255),
	account_id uuid UNIQUE NOT NULL REFERENCES accounts,
	time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);