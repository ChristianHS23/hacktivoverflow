# Hacktiv-Overflow

Built with Express and Mongoose on server side. and built with Vue on client side


**Question Endpoints**


| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR|
|--------|----------|---------|------|------------| -- | -- |
| POST | /question| `token` | title (string), description (string) | Create question | return New Question Object | return error|
| GET | /question | `none` | | Get All question | return All question | return error|
| GET | /question/:id | `none` | | Get One question | return One question | return error|
| GET | /question/user | `token` | | Get Specific User question | return questions | return error|
| PUT | /question/:id | `token` | title (string), description (string) | Update question | return Updated question Object | return error|
| PUT | /question/vote/:id | `token` | status(string between 'upvote' or 'downvote' ) | Update question vote | return Updated question Object | return error|
| DELETE | /question/:id | `token` | | Delete question | return Success | return error|


**Answer Endpoints**


| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR|
|--------|----------|---------|------|------------| -- | -- |
| POST | /answer/:questionId| `token` | description (string) | Create answer | return New Answer Object | return error|
| GET | /answer | `token` | | Get All answer | return All answer | return error|
| GET | /answer/:id | `token` | | Get One answer | return One answer | return error|
| PUT | /answer/:id | `token` | description (string) | Update answer | return Updated answer Object | return error|
| PUT | /answer/vote/:id | `token` | status(string between 'upvote' or 'downvote' ) | Update answer vote | return Updated answer Object | return error|


**Users Endpoint**


| METHOD |  ENDPOINT| HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR|
|---------|---------|---------| ---------| --------- | -- | -- |
| POST |  /users/register | `none` | username (string), email (string),  password (string) | Create user | return User Object | return error|
| POST | /users/login | `none` |email (string), password (string) | Login user | return Token | return error|
### Usage
Make new file `.env` With Template:
```
JWT_SECRET = YOUR-SECRET-HERE
DBNAME = YOUR-DB-NAME-HERE
```

Make sure you have MongooDB,  Node.js and npm installed in your computer, and then run these commands: 

 ```
 $ service mongod start
 $ npm install
 $ npm run dev
 ```
