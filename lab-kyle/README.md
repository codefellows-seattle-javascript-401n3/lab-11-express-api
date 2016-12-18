# Lab-11 Single Resource Express API with Persistence

## Description
This project will let a user create, read, and destroy different Pokemon Schemas by using
the /api/pokemon route in conjunction with GET, POST, and DELETE requests and implements
persistent data using the file system. It uses express to route requests.

## Endpoints
To make a get request, simply make a request to the following endpoints.

* '/api/pokemon'    
  -example  'http://localhost:3000/api/pokemon'

  This will return a list of all current pokemon ID numbers


### GET request

When making a GET request to '/api/pokemon', you may include a querystring with an ID number. It must have a key value of 'id'.

  -example  'http://localhost:3000/api/pokemon/data/<schema>/<id>'

  This will return that specific Pokemon


### POST request

When making a POST request you must include a json object in the body. It must have
both a **name** and **color** property.

  -example '{"name": "Pikachu": "color": "yellow"}'

  This will create a new file with that schemas information

### DELETE request

When making a DELETE request you must include the ID number and the Schema for the
item you wish to delete.

  -example 'http://localhost:3000/api/pokemon/<Schema>/<id>'
