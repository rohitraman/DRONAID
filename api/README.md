# DRONAID API

API for DRONAID.


### Prerequisites

Node, Express and Mongo are required.

### Installing

1) Open terminal in the root folder

2) Start mongo service
```
$ sudo service mongod start
```

3) Run npm install
```
$ npm install
```
4) Run node

```
$ node app.js
```
5) Server runs on port 3000. To access the server, on your web browser, go to
```
localhost:3000/mad/
```
6) To exit, Ctrl+C



### Documentation

Open the index.html file in the docs folder in the root directory

  -OR-
 
Start the server and on your web browser, go to
```
localhost:3000/mad/apidoc/
```

### Checking the database

1) Open terminal in the root folder

2) Start mongo shell
```
$ mongo
```

3) Database name is database
```
> use database
```
4) Collection name is users. To list all entries, use this.

```
> db.users.find()
```




