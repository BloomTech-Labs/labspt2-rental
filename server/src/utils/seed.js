import faker from 'faker';
import config from '../config';
import { User } from '../resources/user/user.model';
import { Property } from '../resources/property/property.model';
import { Task } from '../resources/task/task.model';
import { Reservation } from '../resources/reservations/reservations.model';

export default async () => {
  if (config.isProd) {
    return;
  } else {
    const seedowner = new Promise((resolve, reject) => {
      User.findOne({ username: 'test_owner' }, (err, owner) => {
        if (!owner) {
          User.create({
            role: 'owner',
            username: 'test_owner',
            password: '12345',
            email: 'owner@roostr.io',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            billingPlan: faker.random.number({ min: 1, max: 3 })
          })
            .then(created => {
              resolve(created);
            })
            .catch(() => reject(false));
        } else {
          resolve(owner);
        }
      });
    });

    const seedEmployee = ownerId => {
      return new Promise((resolve, reject) => {
        User.findOne({ username: 'test_employee' }, (err, employee) => {
          if (!employee) {
            User.create({
              role: 'employee',
              username: 'test_employee',
              password: '12345',
              email: 'employee@roostr.io',
              permissions: {
                task: true,
                property: true,
                checkout: true
              },
              createdBy: ownerId,
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName()
            })
              .then(created => {
                resolve(created);
              })
              .catch(() => reject(false));
          } else {
            resolve(employee);
          }
        });
      });
    };

    const seedGuest = new Promise((resolve, reject) => {
      User.findOne({ username: 'test_guest' }, (err, guest) => {
        if (!guest) {
          User.create({
            role: 'guest',
            username: 'test_guest',
            password: '12345',
            email: 'guest@roostr.io',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          })
            .then(created => {
              resolve(created);
            })
            .catch(() => reject(false));
        } else {
          resolve(guest);
        }
      });
    });

    const seedProperties = (ownerId, employeeId) => {
      return new Promise((resolve, reject) => {
        Property.find({ createdBy: ownerId }, (err, properties) => {
          if (!properties.length) {
            let propertiesArr = [];

            for (let i = 0; i < 5; i++) {
              propertiesArr.push({
                name: 'House ' + (i + 1),
                assistants: [employeeId],
                createdBy: ownerId,
                address1: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
                price: faker.random.number({ min: 50, max: 1000 }),
                occupants: faker.random.number({ min: 1, max: 10 }),
                image: faker.random.image()
              });
            }

            Property.insertMany(propertiesArr, (err, docs) => {
              resolve(docs);
            });
          } else {
            resolve(properties);
          }
        });
      });
    };

    const seedTasks = (ownerId, properties) => {
      return new Promise((resolve, reject) => {
        Task.find({ createdBy: ownerId }, (err, tasks) => {
          if (!tasks.length) {
            let promiseArr = [];

            for (let property of properties) {
              let tasksArr = [];
              for (let i = 0; i < 5; i++) {
                tasksArr.push({
                  createdBy: ownerId,
                  description: faker.lorem.sentence(),
                  property: property._id,
                  completed: false
                });
              }

              promiseArr.push(
                new Promise((rs, rj) => {
                  Task.insertMany(tasksArr, (err, docs) => {
                    rs(docs);
                  });
                })
              );
            }

            Promise.all(promiseArr).then(([insertedTasks]) =>
              resolve(insertedTasks)
            );
          } else {
            resolve(tasks);
          }
        });
      });
    };

    const seedReservations = (
      ownerId,
      guestId,
      assistantId,
      properties,
      tasks
    ) => {
      return new Promise((resolve, reject) => {
        Reservation.find({ createdBy: ownerId }, (err, reservations) => {
          if (!reservations.length) {
            let promiseArr = [];

            for (let property of properties) {
              let reservationsArr = [];
              reservationsArr.push({
                createdBy: ownerId,
                assistant: assistantId,
                guest: guestId,
                property: property._id,
                checkIn: faker.date.soon(),
                checkOut: faker.date.future(),
                status: 'upcoming',
                tasks: tasks.filter(t => t.property === property._id),
                nights: faker.random.number({ min: 1, max: 5 }),
                cleaningFee: faker.random.number({ min: 10, max: 100 }),
                guests: faker.random.number({ min: 1, max: 4 }),
                paid: true,
                guestLoginCode: faker.random.uuid()
              });

              reservationsArr.push({
                createdBy: ownerId,
                assistant: assistantId,
                guest: guestId,
                property: property._id,
                checkIn: faker.date.recent(),
                checkOut: faker.date.soon(),
                status: 'incomplete',
                tasks: tasks.filter(t => t.property === property._id),
                nights: faker.random.number({ min: 1, max: 5 }),
                cleaningFee: faker.random.number({ min: 10, max: 100 }),
                guests: faker.random.number({ min: 1, max: 4 }),
                paid: true,
                guestLoginCode: faker.random.uuid()
              });

              reservationsArr.push({
                createdBy: ownerId,
                assistant: assistantId,
                guest: guestId,
                property: property._id,
                checkIn: faker.date.past(),
                checkOut: faker.date.recent(),
                status: 'complete',
                tasks: tasks.filter(t => t.property === property._id),
                nights: faker.random.number({ min: 1, max: 5 }),
                cleaningFee: faker.random.number({ min: 10, max: 100 }),
                guests: faker.random.number({ min: 1, max: 4 }),
                paid: true,
                guestLoginCode: faker.random.uuid()
              });

              promiseArr.push(
                new Promise((rs, rj) => {
                  Reservation.insertMany(reservationsArr, (err, docs) => {
                    rs(docs);
                  });
                })
              );
            }

            Promise.all(promiseArr).then(([insertedReservations]) =>
              resolve(insertedReservations)
            );
          } else {
            resolve(reservations);
          }
        });
      });
    };

    const seedEmployees = ownerId => {
      return new Promise((resolve, reject) => {
        User.find({ createdBy: ownerId, role: 'employee' }, (err, employees) => {
          if (employees.length <= 1) {
            let employeesArr = [];

            for (let i = 0; i < 10; i++) {
              const fakeName = faker.internet.userName();
              employeesArr.push({
                role: 'employee',
                username: fakeName,
                password: '12345',
                email: `${fakeName}@roostr.io`,
                permissions: {
                  task: faker.random.boolean(),
                  property: faker.random.boolean(),
                  checkout: faker.random.boolean()
                },
                createdBy: ownerId,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName()
              });
              console.log(employeesArr.length)
            }

            User.insertMany(employeesArr, (err, docs) => {
              resolve(docs);
            });
          } else {
            resolve(employees);
          }
        });
      });
    };

    const [owner, guest] = await Promise.all([seedowner, seedGuest]);

    const employee = await seedEmployee(owner._id);
    const properties = await seedProperties(owner._id, employee._id);
    const tasks = await seedTasks(owner._id, properties);
    const reservations = await seedReservations(
      owner._id,
      guest._id,
      employee._id,
      properties,
      tasks
    );
    const employees = await seedEmployees(owner._id);

    console.log('Seeded owner          :      ', !!owner._id);
    console.log('Seeded main employee  :      ', !!employee._id);
    console.log('Seeded guest          :      ', !!guest._id);
    console.log('Seeded properties     :      ', !!properties[0]);
    console.log('Seeded tasks          :      ', !!tasks[0]);
    console.log('Seeded reservations   :      ', !!reservations[0]);
    console.log('Seeded extra employees:      ', !!employees[1])

    return tasks;
  }
};
