# Stroop-Test

Tested on ubuntu/debian.

# Basic flow

user hit start -> sessionId generated (uuid) -> send the uuid to the server
-> server generate test items -> client propagate test item -> client select an answer -> answer submit to server -> traverse all test items
-> finalize session -> get results

# Data Structures

check backend/schema/schema.js

# TODO

Music is hardcoded at this moment. We need to integrate music into our data flow. For example, adding it to test item.

Session ID might need redesign.