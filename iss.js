const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};


const fetchCoordsByIP = function(ip) {
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(coordinates) {
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates['latitude']}&lon=${coordinates['longitude']}`);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
