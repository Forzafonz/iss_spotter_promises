/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body)=> {

    if (error) {

      callback(error, null);
      return;


    } else if (response.statusCode !== 200) {
      
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    
    } else {

      let data = JSON.parse(body);
      
      callback(null, data.ip);
      return;

    }

  });

};


const fetchCoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body)=> {

    if (error) {

      callback(error, null);
      return;


    } else if (response.statusCode !== 200) {
      
      const msg = `Status Code ${response.statusCode} when getting coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    
    } else {

      let data = JSON.parse(body);
      
      callback(null, [data.latitude, data.longitude]);
      return;

    }

  });

};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords[0]}&lon=${coords[1]}`, (error, response, body)=> {

    if (error) {

      callback(error, null);
      return;


    } else if (response.statusCode !== 200) {
      
      const msg = `Status Code ${response.statusCode} when getting passing times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    
    } else {

      let passes = JSON.parse(body).response;
      
      callback(null, passes);
      return;

    }
  });
};


const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {

    if (error) {
      return callback(error, null);
              
    } fetchCoordsByIP(ip, (error, coordinates) => {
                
      if (error) {
        return callback(error, null);
                
      } fetchISSFlyOverTimes(coordinates, (err, data) => {
          
        if (error) {
          return callback(error, null);
        
        } callback(null, data);
        
      });
    
    });
  
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
