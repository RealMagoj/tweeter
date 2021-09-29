"use strict";

// Require fs to write to initial-tweets.json
const fs = require("fs");
let tweetsJSON = require('../data-files/initial-tweets.json');

// Write recent dates to initial-tweets.json
module.exports = () => {
  const oneDayMs = 1000 * 60 * 60 * 24
  tweetsJSON = tweetsJSON.map((tweet, index) => {
    tweet.created_at = Date.now() - (oneDayMs * (tweetsJSON.length - index));
    return tweet;
  });
  // Re-write the tweets with the new date values.
  fs.writeFileSync('server/data-files/initial-tweets.json', JSON.stringify(tweetsJSON, null, 2), { encoding: "utf8" });
};
