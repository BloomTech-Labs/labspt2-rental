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
    const seedManager = new Promise((resolve, reject) => {
      User.findOne({ username: 'test_manager' }, (err, manager) => {
        if (!manager) {
          User.create({
            role: 'manager',
            username: 'test_manager',
            password: '12345',
            email: 'manager@roostr.io',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          })
            .then(created => {
              resolve(created);
            })
            .catch(() => reject(false));
        } else {
          resolve(manager);
        }
      });
    });

    const seedEmployee = new Promise((resolve, reject) => {
      User.findOne({ username: 'test_employee' }, (err, employee) => {
        if (!employee) {
          User.create({
            role: 'employee',
            username: 'test_employee',
            password: '12345',
            email: 'employee@roostr.io',
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

    const seedProperties = (managerId, employeeId) => {
      return new Promise((resolve, reject) => {
        Property.find({ createdBy: managerId }, (err, properties) => {
          if (!properties.length) {
            let propertiesArr = [];

            for (let i = 0; i < 5; i++) {
              propertiesArr.push({
                name: 'House ' + (i + 1),
                assistants: [employeeId],
                createdBy: managerId,
                address1: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
                price: faker.random.number({ min: 50, max: 1000 }),
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

    const seedTasks = (managerId, properties) => {
      return new Promise((resolve, reject) => {
        Task.find({ createdBy: managerId }, (err, tasks) => {
          if (!tasks.length) {
            let promiseArr = [];

            for (let property of properties) {
              let tasksArr = [];
              for (let i = 0; i < 5; i++) {
                tasksArr.push({
                  createdBy: managerId,
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
      managerId,
      guestId,
      assistantId,
      properties,
      tasks
    ) => {
      return new Promise((resolve, reject) => {
        Reservation.find({ createdBy: managerId }, (err, reservations) => {
          if (!reservations.length) {
            let promiseArr = [];

            for (let property of properties) {
              let reservationsArr = [];
              reservationsArr.push({
                createdBy: managerId,
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
                createdBy: managerId,
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
                createdBy: managerId,
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

    const [manager, employee, guest] = await Promise.all([
      seedManager,
      seedEmployee,
      seedGuest
    ]);

    const properties = await seedProperties(manager._id, employee._id);
    const tasks = await seedTasks(manager._id, properties);
    const reservations = await seedReservations(
      manager._id,
      guest._id,
      employee._id,
      properties,
      tasks
    );

    console.log('Seeded manager        :      ', !!manager._id);
    console.log('Seeded employee       :      ', !!employee._id);
    console.log('Seeded guest          :      ', !!guest._id);
    console.log('Seeded properties     :      ', !!properties[0]);
    console.log('Seeded tasks          :      ', !!tasks[0]);
    console.log('Seeded reservations   :      ', !!reservations[0]);

    return tasks;
  }
};
