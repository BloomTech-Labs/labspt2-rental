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



### Employees

#### Employee Model
---
```
{
  _id: UUID
  name: STRING, required, max 100 chars
  user: user foreign key, user_id
  createdBy: user foreign key, **Currently does not exist**
  employer: user foreign key, employer's user_id
  baseAddress: STRING, required
  taskPermission: BOOLEAN, default = false
  propertyPermission: BOOLEAN, default = false
  checkoutPermission: BOOLEAN, default = false
}
```

#### Employee Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/api/employees/`               | Owner, Employee     | Creates a new user account (owner or employee)     |
| POST   | `/api/employees/`               | Owner               | Allows a valid user to access the application      |
| GET    | `/api/employees/:id`            | Owner, Employee     | Returns a single employees's data                  |
| PUT    | `/api/employees/:id`            | Owner               | Updates a single employee's data                   |
| DELETE | `/api/employees/:id`            | Owner               | Delete's a single employee's data                  |


#### Employee Route Data Objects

All endpoints expect a matching object to the Employee Model

#### User actions

`createOne(employee)` -> Creates employee
`getMany()` -> Returns employees created by that Owner
`getOne(id)` -> Returns employee by ID
`updateOne(id)` -> Updates employee by ID
`removeOne(id)` -> Deletes employee by ID






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





### Properties

#### Properties Model
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

#### Properties Routes

| Method | Endpoint                        | Access Control        | Description                                      |
|--------|---------------------------------|-----------------------|--------------------------------------------------|
| GET    | `/api/properties/`                   | coordinators, donors  | Returns all stories                         |


#### Property Route Data Objects

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

#### Proprty Actions

`me(userID)` -> Returns user by ID

`updateMe(userID)` -> Updates user by user ID






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