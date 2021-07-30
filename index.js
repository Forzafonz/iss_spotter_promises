const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

const printResults = function(data) {
  for (const pass of data) {
    let timestamp = pass['risetime'];
    let date = new Date(0);
    date.setUTCSeconds(timestamp);
    console.log(`Next pass at ${date} for ${pass['duration']}`);
  }
};

const IP = fetchMyIP();

IP
.then((result) => {
  let ip = JSON.parse(result).ip;
  return ip;
})
.then(fetchCoordsByIP)
.then((body) => {
  let {latitude, longitude} = JSON.parse(body)
  return {latitude, longitude}
})
.then(fetchISSFlyOverTimes)
.then((body) => {
  let data = JSON.parse(body).response;
  return (data)
})
.then(printResults)
