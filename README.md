# Roostr

## One app to manage your rental properties

[![Netlify Status](https://api.netlify.com/api/v1/badges/98ec96bf-5891-4699-bf51-abbe35d29821/deploy-status)](https://app.netlify.com/sites/roostr/deploys)

Roostr is a SaaS for property owners to schedule short-term rentals and keep track of employees who manage those properties. This ReadMe covers the open-source project.<br> <br>

Deployed Site: https://roostr.tech<br>
Server Deployment: http://138.197.202.158/<br>
Wireframe: https://balsamiq.cloud/snv27r3/pwc7ekv/rCF28

## Table of Contents

- [Team](#team)
- [Motivation](#Motivation)
- [Features](#Features)
- [Tech Stack](#tech-stack)
- [API](#API)
- [Contributing](#Contributing)


## Team
|   [**Bryce Evans**](https://github.com/BryceEvans)  |   [**Jess Harrison**](https://github.com/jessharrison83)   |    [**Julie Jonak**](https://github.com/juliejonak)    |   [**Kyle Baker**](https://github.com/kybak)  |   [**Michael Littleton**](https://github.com/mglittleton)  |
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:|
| [<img src="https://avatars3.githubusercontent.com/u/1979676?s=400&v=4" width="80">](https://github.com/BryceEvans) | [<img src="https://avatars1.githubusercontent.com/u/38193167?s=400&v=4" width="80">](https://github.com/jessharrison83)  | [<img src="https://avatars0.githubusercontent.com/u/41002881?s=460&v=4" width="80">](https://github.com/juliejonak) | [<img src="https://avatars2.githubusercontent.com/u/40449620?s=400&v=4" width="80">](https://github.com/kybak) | [<img src="https://avatars2.githubusercontent.com/u/40123075?s=400&v=4" width="80">](https://github.com/mglittleton) 
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/BryceEvans)  |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/jessharrison83) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/juliejonak)  | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/kybak) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/mglittleton)  
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/bryce-evans/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/jessica-harrison-2018/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/juliejonak/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/kylepattonbaker/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/michael-littleton-5b9a5462/) |


### Motivation

Roostr is a SaaS application that gives short-term rental property managers the ability to manage properties more easily. Our software makes it easy for a manager to view properties and their availabilities, bookings, maintenance issues, and keep track of all to do items before, during and after a guest’s stay

With a simplistic UI design, Rental POS combines the standard SaaS software that exists currently for managing reservations with the ability to easily coordinate employees who work on property, in one place, without having to utilize an extremely robust software. Rental POS is more extensive than most existing vacation rental solutions but lower cost than enterprise level solutions. Our software is ideal for rental property managers of 1-50 properties.

### Features

- Landing Page - includes a vibrant, succint description of the site and user accounts
- Billing through Stripe in three-tier system - 1 property (free), 2-10 properties, and >10 properties
- Dashboard that shows all relevant at-a-glance information that an owner needs to see
- Employees page that shows all employees and all relevant info about them
- Reservations view that shows upcoming and current guest stays
- Tasks view that provides a to-do list style view of all things that are happening right now
- Property view that allow an owner to manage all aspects of a property
- Settings can be changed, including passwords, user info, billing info, etc.

### Tech Stack

#### Front End

- Core: React w/ Redux
- Style: Semantic UI & styled components
- Netlify

#### Back End

- Node.js and Express
- MongoDB modeled via Mongoose
- Sendgrid email delivery
- Stripe billing

### API

Please visit [this site](https://app.swaggerhub.com/apis-docs/Roostr/roostr-rentals/1.0.0) to view our interactive API and data models.

### Contributing

If you would like to contribute to this repository, please first discuss the change you wish to make via GitHub, email, or any other method with the authors of this repository.
