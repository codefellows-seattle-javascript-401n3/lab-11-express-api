### Welcome to the README of API with Express Routing
---
You will be using simple express Router commands such as
1. GET
2. POST
3. PUT
4. DELETE

To first fetch and display a list of all recipes you would:

 ```curl http://localhost:3000/api/recipe```

 To look up a particular recipe just use the ID:

 ```curl http://localhost:3000/api/recipe?id=recipeID```

 To post a new recipe and generate an ID you will need to:

 ```curl -X POST -H "Content-Type: application/json" -d '{"name":"pasta", "content":"noodles and sauce", "mealType":"dinner"}' http://localhost:3000/api/recipe/```

Congrats a copy now lives in your /data/recipe folder. You will see that the file name is actually the ID. Now if you wish to update from pasta to soup with keeping the same file you can:

 ```curl -X PUT -H "Content-Type: application/json" -d '{"name":"minestrone", "content":"pasta, beans, veggies", "mealType":"soup"}' http://localhost:3000/api/recipe/theRecipeID```

 Finally to delete a recipe you can

 ```curl -X DELETE http://localhost:3000/api/recipe/theRecipeID```
