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

##### POST `/register`
---
```
{
  username: STRING, required, unique, max 50 chars
  password: STRING, required
  email: STRING, required, unique
}
```

##### POST `/login`
---
```
{
  password: STRING, required
  email: STRING, required
}
```

##### PUT `/me`
---
```
{
  username: STRING, required, unique, max 50 chars
  password: STRING, required
  email: STRING, required, unique
}
```

#### User actions

`me(userID)` -> Returns user by ID

`updateMe(userID)` -> Updates user by user ID




### Tasks

#### Tasks Model
---
```
{
  _id: UUID,
  description: STRING, required, max 200 chars,
  createdBy: userID, required,
  startDate: Date,
  endDate: Date,
  completed: Boolean, required,
  house: propertyID,
  reservation: reservationID
}
```

#### Tasks Routes

| Method | Endpoint                        | Access Control         | Description                                      |
|--------|---------------------------------|------------------------|--------------------------------------------------|
| GET    | `/api/tasks/`                   | Owner, Employee        | Returns all task lists                           |
| POST   | `/api/tasks/`                   | Owner                  | Add new task list                                |
| GET    | `/api/tasks/:id`                |     |              |
| PUT    | `/api/tasks/:id`                |     |              |
| DELETE | `/api/tasks/:id`                |     |              |


#### Task Route Data Objects

##### POST `/register`
---
```
{
  username: STRING, required, unique, max 50 chars
  password: STRING, required
  email: STRING, required, unique
}
```

##### POST `/login`
---
```
{
  password: STRING, required
  email: STRING, required
}
```

##### PUT `/me`
---
```
{
  username: STRING, required, unique, max 50 chars
  password: STRING, required
  email: STRING, required, unique
}
```

#### Task Actions

`me(userID)` -> Returns user by ID

`updateMe(userID)` -> Updates user by user ID






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

#### Example
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