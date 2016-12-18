This is a RESTful API that responds to GET, POST, PUT and DELETE HTTP commands. A router is set up that handles these commands and directs them appropriately.

This app has two versions: one version with persistence that lasts as long as the server continues to run, and other version that uses the host's filesystem to mimic persistence so that data will be retained regardless of the state of the server. Commented lines in the storage.js file indicate which code matches which version.

What this app does is that on a POST request, it will create an instance of a user that has three properties: a randomized ID, a username that is set within the command, and the date-time at which the user was created and stored as a JSON object. A properly formatted GET request will print out the details of a specific user if the user exists in the DB. The user is obtained by putting their unique ID into the URL's query string.  a properly formatted DELETE request will delete a specific instance of a user. The router will respond to a PUT request, however there is no functionality currently implemented for that request as of 12/12/16. Below are examples of properly formatted GET, POST, and DELETE requests:

curl -H "Content-Type: application/json" -X POST -d '{"username": "steve"}' http://localhost:3000/api/users //this will create a user with username "steve"

curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/users?id=user_0befc49d-7af0-42b4-bedf-27df150277a6 //this will print out the details for that specific user who exists in the database

curl -H "DELETE" http://localhost:3000/api/users?id=user_0befc49d-7af0-42b4-bedf-27df150277a6 //this will delete that specific user from the database.
