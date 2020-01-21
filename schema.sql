DROP SCHEMA IF EXISTS ephemeris;
CREATE SCHEMA ephemeris;

SET client_min_messages = error;

DROP TABLE IF EXISTS statsBefore CASCADE;
ALTER SEQUENCE statsBefore_statsBefore_id_seq RESTART WITH 1;
CREATE TABLE IF NOT EXISTS statsBefore (
  statsBefore_id serial,
  moodBefore int,
  location text,
  timeOfDay text,
  journalEntry text,
  CONSTRAINT statsBefore_id PRIMARY KEY (statsBefore_id)
);

DROP TABLE IF EXISTS statsAfter CASCADE;
ALTER SEQUENCE statsAfter_statsAfter_id_seq RESTART WITH 1;
CREATE TABLE IF NOT EXISTS statsAfter (
  statsAfter_id serial,
  statsBefore_id serial,
  moodAfter int,
  location text,
  timeOfDay text,
  meditationStyle text,
  minutesSpent int,
  journalEntry text,
  CONSTRAINT statsAfter_id PRIMARY KEY (statsAfter_id),
  FOREIGN KEY (statsBefore_id) REFERENCES statsBefore (statsBefore_id)
);