This is a RESTful API that responds to GET, POST, PUT and DELETE HTTP commands. Express.js is used for all the routing purposes.

What this app does is that on a POST request, it will create an instance of a user that has three properties: a randomized ID, a username that is set within the command, and the date-time at which the user was created and stored as a JSON object. A properly formatted GET request will print out the details of a specific user if the user exists in the DB. The user is obtained by putting their unique ID into the URL's query string.  a properly formatted DELETE request will delete a specific instance of a user. A properly formatted PUT request will fetch an instance of a user, and then update a user property to whatever is being placed in the request. Below are examples of properly formatted GET, POST, and DELETE requests:

curl -H "Content-Type: application/json" -X POST -d '{"username": "steve"}' http://localhost:3000/api/users //this will create a user with username "steve"

curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/users?id=[ANY EXISTING USER ID] //this will print out the details for that specific user who exists in the database

curl -H "DELETE" http://localhost:3000/api/users?id=[ANY EXISTING USER ID] //this will delete that specific user from the database.

curl -X PUT -H "Content-Type: application/json" -d '{"username":"Bert"}' http://localhost:3000/api/users?id=[ANY EXISTING USER ID] //this will update the the username property of the given user to have a value of "Bert".

To see this all in action, clone this repo into your own directory, use npm install to bring in all the dependencies, and then in your command line type "node server.js" and then you will be able to use it for the purposes described above.
