A simple cms in Node.js with mongoDB CRUD.


## Get Start

	npm install
	npm start

-> localhost:3333

## Test

-> localhost:3333/users

Note: Need create a DB named 'nodecms' and a collection named 'users' in mongoDB.

Or restore test data in mongoDB:

mongorestore --host {YourMongoDBServer} --port {Port} --collection {users} --db {nodecms} dump/nodecms/users.bson
