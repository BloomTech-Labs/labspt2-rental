import faker from 'faker';
import config from '../config';
import { User } from '../resources/user/user.model';
import { Property } from '../resources/property/property.model';
import { Task } from '../resources/task/task.model';

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
            email: 'manager@roostr.io'
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
            email: 'employee@roostr.io'
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
            email: 'guest@roostr.io'
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
        Property.find({ manager: managerId }, (err, properties) => {
          if (!properties.length) {
            let propertiesArr = [];

            for (let i = 0; i < 5; i++) {
              propertiesArr.push({
                name: 'House ' + (i + 1),
                assistants: [employeeId],
                manager: managerId,
                address:
                  faker.address.streetAddress() +
                  ' ' +
                  faker.address.city() +
                  ' ' +
                  faker.address.state() +
                  ' ' +
                  faker.address.zipCode(),
                price: faker.random.number({ min: 50, max: 1000 })
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

    const [manager, employee, guest] = await Promise.all([
      seedManager,
      seedEmployee,
      seedGuest
    ]);

    const properties = await seedProperties(manager._id, employee._id);
    const tasks = await seedTasks(manager._id, properties);

    console.log('Seeded manager        :      ', !!manager._id);
    console.log('Seeded employee       :      ', !!employee._id);
    console.log('Seeded guest          :      ', !!guest._id);
    console.log('Seeded properties     :      ', !!properties[0]);
    console.log('Seeded tasks          :      ', !!tasks[0]);

    return tasks;
  }
};
