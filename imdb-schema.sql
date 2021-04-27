CREATE TABLE movies (
  id UUID PRIMARY KEY NOT NULL,
  name TEXT UNIQUE NOT NULL,
  plot TEXT,
  poster VARCHAR,
  actors TEXT[],
  producer TEXT
);

CREATE TABLE actors (
  id UUID PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  sex CHARACTER(8) NOT NULL,
  dob DATE NOT NULL,
  bio TEXT 
);

CREATE TABLE producer (
  id UUID PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  sex CHARACTER(8) NOT NULL,
  dob DATE NOT NULL,
  bio TEXT,
);

CREATE TABLE users (
  id uuid PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);
