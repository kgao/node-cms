A simple cms in Node.js with restful mongoDB CRUD API.


## Get Start

	npm install
	npm start

-> localhost:3333

## Test

-> localhost:3333/users

Note: Need create a DB named 'nodecms' and a collection named 'users' in mongoDB.

## Data reset in Manually Safe Mod

	mongo nodecms --eval "db.dropDatabase()"

	mongorestore --host {YourMongoDBServer} --port {Port} --collection users --db nodecms dump/nodecms/users.bson

	(Or use 2-step-Reset button from /users)

## Usecase

1. Proxy to 3rd party API.
2. Build your own data API on top of mongoDB.  
