# API Documentation

## Users

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



## Employees

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
  permissions: {
  task: BOOLEAN, default = false
  property: BOOLEAN, default = false
  checkout: BOOLEAN, default = false
  }
}
```

#### Employee Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/api/employees/`               | Owner, Employee     | Creates a new user account (owner or employee)     |
| POST   | `/api/employees/`               | Owner               | Allows a valid user to access the application      |
| GET    | `/api/employees/:id`            | Owner, Employee     | Returns a single employees's data                  |
| PUT    | `/api/employees/:id`            | Owner               | Updates a single employee's data                   |
| DELETE | `/api/employees/:id`            | Owner               | Deletes a single employee's data                   |


#### Employee Route Data Objects

All endpoints expect a matching object to the Employee Model

#### User actions

`createOne(employee)` -> Creates employee

** `getMany()` -> Returns employees created by that Owner

`getOne(id)` -> Returns employee by ID

`updateOne(id)` -> Updates employee by ID

`removeOne(id)` -> Deletes employee by ID






## Tasks

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

| Method | Endpoint                        | Access Control                  | Description                             |
|--------|---------------------------------|---------------------------------|-----------------------------------------|
| GET    | `/api/tasks/`                   | Owner, Employee(w/ permissions) | Returns all task lists                  |
| POST   | `/api/tasks/`                   | Owner, Employee(w/ permissions) | Add new task list                       |
| GET    | `/api/tasks/:id`                | Owner, Employee(w/ permissions) | Returns a single task list's data       |
| PUT    | `/api/tasks/:id`                | Owner, Employee(w/ permissions) | Updates a single task list's data       |
| DELETE | `/api/tasks/:id`                | Owner, Employee(w/ permissions) | Deletes a single task list's data       |


#### Task Route Data Objects

All endpoints expect a matching object to the Tasks Model

#### Task Actions

`createOne(tasks)` -> Creates task

** `getMany()` -> Returns tasks created by that Owner? Employee?

`getOne(id)` -> Returns task list by ID

`updateOne(id)` -> Updates task list by ID

`removeOne(id)` -> Deletes task list by ID





## Properties

#### Properties Model
---
```
{
  _id: UUID,
  name: STRING, required, unique
  **assistants: ARRAY, of employee userIDs, (employee foreign key? User foreign key?) (should be called employees)
  **createdBy: OBJECT, user foreign key?
  **address: STRING, required (should be object of strings, not string for all address properties)
  price: NUMBER, required
  tasks: ARRAY, task foregin key, task_id

}
```

#### Properties Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/api/properties/`              | Owner, Employee     | Returns all properties for that owner              |
| POST   | `/api/properties/`              | Owner               | Adds new property                                  |
| GET    | `/api/properties/:id`           | Owner, Employee     | Returns a single property's data                   |
| PUT    | `/api/properties/:id`           | Owner               | Updates a single property's data                   |
| DELETE | `/api/properties/:id`           | Owner               | Deletes a single property's data                   |

#### Property Route Data Objects

All endpoints expect a matching object to the Property Model


#### Proprty Actions

`createOne(property)` -> Creates new property

** `getMany()` -> Returns properties created by that Owner?

`getOne(id)` -> Returns property by ID

`updateOne(id)` -> Updates property by ID

`removeOne(id)` -> Deletes property by ID




## Billing Plans

#### Billing Plans Model
---
```
{
  _id: UUID,
  name: STRING, required, ['Free', 'Midlevel', 'Enterprise']
  perPropertyPrice: NUMBER, required
  perTransactionFee: NUMBER, required
}
```

#### Billing Plan Routes

| Method | Endpoint                        | Access Control        | Description                                      |
|--------|---------------------------------|-----------------------|--------------------------------------------------|
| GET    | `/api/billing/`                 | Owner                 | Returns all billing plans                        |
| GET    | `/api/billing/:id`              | Owner                 | Returns billing plan by id                       |


#### Billing Plan Actions

`getMany()` -> Returns all billing plans

`getOne(id)` -> Returns billing plan by ID



## Invoice Items

#### Invoice Items Model
---
```
{
  _id: UUID,
  name: STRING, required, max 100 chars
  description: STRING, max 500 chars
  price: NUMBER, required, >=0
  owner: user foreign key, user_id
  defaultItem: BOOLEAN, required, default = false
  lastUsed: DATE, required, default = now
}
```

#### Invoice Items Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/api/invoice/`                 | Owner, Employee     | Returns all invoice items for that owner? property?|
| POST   | `/api/invoice/`                 | Owner               | Adds new invoice item                              |
| GET    | `/api/invoice/:id`              | Owner, Employee     | Returns a single invoice's data                    |
| PUT    | `/api/invoice/:id`              | Owner               | Updates a single invoice's data                    |
| DELETE | `/api/invoice/:id`              | Owner               | Deletes a single invoice's data                    |

#### Invoice Item Route Data Objects

All endpoints expect a matching object to the Invoice Item Model


#### Proprty Actions

`createOne(invoiceItem)` -> Creates new invoice item

** `getMany()` -> Returns invoice items created by that Owner?

`getOne(id)` -> Returns invoice item by ID

`updateOne(id)` -> Updates invoice item by ID

`removeOne(id)` -> Deletes invoice item by ID






## Discounts

#### Discounts Model
---
```
{
  _id: UUID,
  name: STRING, required, max 100 chars
  description: STRING, max 500 chars
  discountPercentage: NUMBER, required, 0 <= x <= 1
  owner: user foreign key, user_id
  lastUsed: DATE, required, default = now
}
```

#### Discounts Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/api/discounts/`                 | Owner, Employee     | Returns all discounts for that owner             |
| POST   | `/api/discounts/`                 | Owner               | Adds new discount                                |
| GET    | `/api/discounts/:id`              | Owner, Employee     | Returns a single discount's data                 |
| PUT    | `/api/discounts/:id`              | Owner               | Updates a single discount's data                 |
| DELETE | `/api/discounts/:id`              | Owner               | Deletes a single discount's data                 |

#### Discounts Route Data Objects

All endpoints expect a matching object to the Discounts Item Model


#### Discount Actions

`createOne(invoiceItem)` -> Creates new discount

** `getMany()` -> Returns discounts created by that Owner?

`getOne(id)` -> Returns discount by ID

`updateOne(id)` -> Updates discount by ID

`removeOne(id)` -> Deletes discount by ID


## Stripe

#### Stripe Routes

| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| GET    | `/api/stripe/`                  | Sets up stripe integration                         |
| POST   | `/api/stripe/subscribe`         | Creates subscription                               |
| GET    | `/.well-known/apple-developer-merchantid-domain-association` 
                                           | Sets up Apple Pay integration                      |
