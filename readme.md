# TODO API
### To run on local machine 
- run npm install to install all the required node modules
- use below address to create the user data 
 ```sh
 http://localhost:8001/
 ```
 -use below address for signin 
 ```sh
 http://localhost:8001/api/signin
 
 and pass following urlencoded key values 
 email :
 password:
 this returns the accessToken and id
 ```
 -use below route for creating a new todo item
 ```sh
 localhost:8001/api/create-todo/:id
 here id is the user's id who is creating the todo item
 ```
