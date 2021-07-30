const { nextISSTimesForMyLocation } = require('./iss');

const printResults = function(err, data) {
  if (err) {
    console.log("Something went wrong: ", err);
  } else {
    for (const pass of data) {
      let timestamp = pass['risetime'];
      let date = new Date(0);
      date.setUTCSeconds(timestamp);
      console.log(`Next pass at ${date} for ${pass['duration']}`);
    }
  }
};

nextISSTimesForMyLocation(printResults);