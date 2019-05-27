A working version of the app is installed in Amazon Lightsail at: http://18.206.45.41:3000/ 

The app code is available at: https://github.com/dktshiany/decentral 

Instructions on setup / running the application:
Make sure node, npm and angular cli are installed in your system, then run the following commands:
-- command list start --
git clone https://github.com/dktshiany/decentral.git decentral_app
cd decentral_app
npm install
cd frontend
npm install
ng build --prod=true
cd ..
npm start
-- command list end --

After that, open the browser on your system at : http://localhost:3000/ 





Decentral Front End Challenge
Goal:
- The goal of this challenge is to simulate real work at Decentral. During a typical day, a
Front End Developer is expected to:
- Interact with various API’s
- Create Angular Components and Views based on this data
- Optimize load times of components
- Write efficient algorithms for interacting with data
- Write tests for all their work
Challenge:
- Using the public Bittrex API, create a web application using your favourite framework that
displays the market summary for all supported trading pairs.
- Allow the user to search for a particular trading pair. Eg. BTC-LTC
- Give the user an option to sort the pairs by percentage gain / loss per day. Percentage gain
can be calculated by (Last - PrevDay) / PrevDay. Please implement your own sorting
algorithm.
API:
- https://api.bittrex.com/api/v1.1/public/getmarketsummaries
