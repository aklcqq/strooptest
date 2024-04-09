# Demo
https://tinyurl.com/cogsci-strooptest

# Stroop-Test

Tested on ubuntu/debian. should be similar on macOS.

# Requirement

node.js & mongodb

check https://nodejs.org/en/download/current
and https://www.mongodb.com/try/download/community

# build & run
Make sure mongodb is up and running.

For backend:
add a config file .env under backend/src/config
~~~
PORT=4000
MONGO_URI=mongodb://localhost:27017/stroopTest
~~~

under backend dir
~~~
npm install
npm run
~~~

to run test for api
~~~
npm test
~~~

For frontend

edit uri in apolloClient.js under frontend/src/apolloClient.js to graphql api.

~~~
cd frontend
npm install
npm start
~~~

# Basic flow

user hit start -> sessionId generated (uuid) -> send the uuid to the server
-> server generate test items -> client propagate test item -> client select an answer -> answer submit to server -> traverse all test items
-> finalize session -> get results

# Data Structures

check backend/schema/schema.js

# TODO

Music is hardcoded at this moment. We need to integrate music into our data flow. For example, adding it to test item.

or we can just keep the hardcoded music. See frontend/src/App.js
~~~
  const [currentSong, setCurrentSong] = useState('https://download.samplelib.com/mp3/sample-6s.mp3'); // Start with the first song
  const songs = ['https://download.samplelib.com/mp3/sample-3s.mp3', 'https://download.samplelib.com/mp3/sample-9s.mp3', 'https://download.samplelib.com/mp3/sample-6s.mp3']; 
~~~
change songs accordingly.

Session ID might need redesign.

# Misc

hide audio control panel in components/MusicPlayer