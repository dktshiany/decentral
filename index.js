//
const express = require("express");
const cors = require("cors");
const path = require('path');
const request = require("request");

const app = express();
const router = express.Router();

const port = 3000;

// Epress Middleware
app.use(cors());
app.use(express.static(__dirname + '/frontend/dist/frontend/'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', router);

//Date format
function appendLeadingZeroes(n){
  if(n <= 9){
    return "0" + n;
  }
  return n;
}

// Market data service
router.route('/marketapi').get((req, res) => {
  console.log('Fetching data...');
  request.get({
    "headers": { "content-type": "application/json" },
    "url": "https://api.bittrex.com/api/v1.1/public/getmarketsummaries"
  }, 
  (error, response, body) => {
      if(error) {
          return console.dir('Data error: ' + error);
      }
      console.log('Data OK');
      
      var marketResponse = JSON.parse(body);
      
      // Calculate gain and format dates
      //
	    marketResponse.result.forEach(function(entry) {		  
      
        entry.GainInPercentage = 0;
        if (entry.PrevDay != 0)
          entry.GainInPercentage =(entry.Last - entry.PrevDay) / entry.PrevDay;

        entry.GainInPercentage = entry.GainInPercentage.toFixed(6);        
        entry.PrevDay = entry.PrevDay.toFixed(8);
        entry.Last = entry.Last.toFixed(8);
        entry.Volume = entry.Volume.toFixed(2);

        let current_datetime = new Date(entry.Created);        
        entry.Created = current_datetime.getFullYear() + "-" + 
            appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + 
            appendLeadingZeroes(current_datetime.getDate()) + " " + 
            appendLeadingZeroes(current_datetime.getHours()) + ":" + 
            appendLeadingZeroes(current_datetime.getMinutes()) + ":" + 
            appendLeadingZeroes(current_datetime.getSeconds());
      });    

      // Custom sort only when sort request is from 'Gain' column
      //
      if (req.query.act == 'GainInPercentage'){
        if (req.query.dir == 'asc'){
          marketResponse.result.sort(function(entry1, entry2) {
            return entry1.GainInPercentage - entry2.GainInPercentage;
          });
        }
        if (req.query.dir == 'desc'){
          marketResponse.result.sort(function(entry1, entry2) {
            return entry2.GainInPercentage - entry1.GainInPercentage;
          });
        }
      }

      res.send({
        success:marketResponse.success,
        message:marketResponse.message,
        result:marketResponse.result		  
      });
  });
});

// Test route
router.route('/test_route').get((req, res) => {
  var testmsg = 'Test Route OK!';
  console.log(testmsg);
  res.send(testmsg);
});

// Main Angular application
router.route('/').get((req, res) => {
  var appPath = '/frontend/dist/frontend/index.html';
  console.log('App request');
  res.sendFile(path.resolve(appPath));
});


// Start server
app.listen(port, () => console.log('Express server running on port ' + port));

// Export app for testing
//export default app;

module.exports = app