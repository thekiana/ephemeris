const { Pool } = require('pg')

const pool = new Pool({
  database: 'ephemeris'
});

module.exports = {
  getStats: {
    get: (req, res) => {
      let joinQuery = `SELECT sb.moodBefore, sa.moodAfter, sa.meditationStyle, sa.minutesSpent FROM statsBefore as sb INNER JOIN statsAfter as sa on sb.statsBefore_id = sa.statsBefore_id`;
      pool.query(joinQuery, (err, result) => {
        if (err) {
          console.error(`Error executing query ${err.stack}`)
          res.status(404).send(err);
        } else {
          console.log('result in controller ', result.rows);

          res.status(200).send(result.rows);
        }
      });
    }
  },
  postStatsBefore: {
    post: (req, res) => {
      // req.body.moodBefore = parseInt(req.body.moodBefore);

      pool.query(`INSERT INTO statsBefore (moodBefore, location, timeOfDay, journalEntry) VALUES (${req.body.moodBefore}, '${req.body.location}', '${req.body.timeOfDay}', '${req.body.journalEntry}')`, (err, result) => {
        if (err) {
          console.error(`Error executing query ${err.stack}`)
          // console.log('req.body ', req.body);
          res.status(404).send(err);
        } else {
          // console.log('result ', result);
          res.status(200).end();
        }
      });
    }
  },
  postStatsAfter: {
    post: (req, res) => {
      // req.body.moodAfter = parseInt(req.body.moodAfter);
      // req.body.minutesSpent = parseInt(req.body.minutesSpent);
      
      pool.query(`INSERT INTO statsAfter (moodAfter, location, timeOfDay, meditationStyle, minutesSpent, journalEntry) VALUES (${req.body.moodAfter}, '${req.body.location}', '${req.body.timeOfDay}', '${req.body.meditationStyle}', ${req.body.minutesSpent}, '${req.body.journalEntry}' )`, (err, result) => {
        if (err) {
          console.error(`Error executing query ${err.stack}`)
          // console.log('req.body ', req.body);
          res.status(404).send(err);
        } else {
          // console.log('result ', result);
          res.status(200).end();
        }
      });
    }
  },
}