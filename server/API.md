## API Documentation

### Users

#### User Model
---
```
{
  _id: UUID
  username: STRING, required, unique, max 50 chars
  password: STRING, required
  email: STRING, required, unique
}
```

#### User Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| POST   | `/api/users/register`           | all users           | Creates a new user account (owner or employee)     |
| POST   | `/api/users/login`              | all users           | Allows a valid user to access the application      |
| GET    | `/api/users/me`                 | Owner, Employee     | Returns a single user's data                       |
| PUT    | `/api/users/me`                 | Owner, Employee     | Updates a single user's data                       |

#### User Route Data Objects

POST `/register`
---
```
{
  username: STRING, required, unique, max 50 chars
  password: STRING, required
  email: STRING, required, unique
}
```

POST `/login`
---
```
{
  password: STRING, required
  email: STRING, required
}
```

PUT `/me`
---
```
{
  username: STRING, required, unique, max 50 chars
  password: STRING, required
  email: STRING, required, unique
}
```



#### Project Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| POST   | `/api/projects/`           | all users           | Creates a new user account (donor or coordinator)  |


#### Tasks Routes

| Method | Endpoint                        | Access Control        | Description                                      |
|--------|---------------------------------|-----------------------|--------------------------------------------------|
| POST   | `/api/tasks/:id`                    | single coordinator    | Adds new story with coordinator's id             |


#### Properties Routes

| Method | Endpoint                        | Access Control        | Description                                      |
|--------|---------------------------------|-----------------------|--------------------------------------------------|
| GET    | `/api/properties/`                   | coordinators, donors  | Returns all stories                              |

#### Billing Plan Routes

| Method | Endpoint                        | Access Control        | Description                                      |
|--------|---------------------------------|-----------------------|--------------------------------------------------|
| GET    | `/api/billing/`                   | coordinators, donors  | Returns all stories                              |

#### Invoice Items Routes

| Method | Endpoint                        | Access Control        | Description                                      |
|--------|---------------------------------|-----------------------|--------------------------------------------------|
| GET    | `/api/invoice/`                   | coordinators, donors  | Returns all stories                              |


## models

#### USERS
---
```
{
  id: UUID
  username: STRING, unique, max 100 chars
  password: STRING
  email: STRING, unique
  role: STRING [ 'Coordinator', 'Donor' ]
  country: STRING [ 'Bolivia', 'Brazil', 'Cambodia', 'Colombia', 'Ecuador', 'El Salvador', 'Ghana', 'Guatemala', 'Haiti', 'Honduras', 'Kiribati', 'Madagascar', 'Mongolia', 'Nicaragua', 'Paraguay', 'Peru', 'Philippines', 'Sierra Leone', 'Zimbabwe' ]
  organization_title: STRING
  created_at: DATE & TIME STRING in YYYY-MM-DD [ 0 - 23 ] [HH:MM:SS]
}
```

#### STORIES
---
```
{
  id: UUID
  title: STRING, unique, max 250 chars
  country: STRING [ 'Bolivia', 'Brazil', 'Cambodia', 'Colombia', 'Ecuador', 'El Salvador', 'Ghana', 'Guatemala', 'Haiti', 'Honduras', 'Kiribati', 'Madagascar', 'Mongolia', 'Nicaragua', 'Paraguay', 'Peru', 'Philippines', 'Sierra Leone', 'Zimbabwe' ]
  description: STRING
  updated_at: DATE & TIME STRING in YYYY-MM-DD [ 0 - 23 ] [HH:MM:SS]
  small_image: STRING
  large_image: STRING
  user_id: UUID foreign key in USERS table
}
```


## actions

`fetch(id)` -> Returns user by ID

`fetchCountry(id)` -> Returns user's country by user ID

`register(user)` -> Adds user to the database

`login(username)` -> Authenticates user by username

`update(id, user)` -> Updates user profile by user ID

`remove(id)` -> Removes user by ID

<br>

`fetch()` -> Returns all stories

`fetch(id)` -> Returns story by story ID

`fetchUserStories(userID)` -> Returns all stories by a specific user ID

`add(story)` -> Adds new story

`update(id, story)` -> Updates story by ID

`delete(id)` -> Removes story by ID

<br>

`passwordProtection(password, res)` -> Verifies password is at least 12 characters long and hashes it

`loginCheck()` -> Verifies username and password are on request

`generateToken(username, id, role)` -> Creates JWT token

`authenticate()` -> Retrieves token and verifies the validity of the user

`coordAuth()` -> Verifies user is a Coordinator to grant access to restricted pages

`verifyUser()` -> Verifies the request is to the account of the logged in user only

<br>

`checkRegistrationFields()` -> Verifies all fields are filled properly for user creation or updating

`checkStoryFields()` -> Verifies all fields are filled properly for story creation or updating

`assignIamge(country)` -> Returns small and large image URL for given country

`assignCountry(id, res)` -> Assigns story the same country as the Coordinator creating it

`checkIfUser()` -> Verifies the userID is valid