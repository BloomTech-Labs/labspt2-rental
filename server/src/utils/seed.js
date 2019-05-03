/* eslint-disable promise/param-names */
/* eslint-disable prefer-promise-reject-errors */
import faker from 'faker';
import config from '../config';
import { User } from '../resources/user/user.model';
import { Property } from '../resources/property/property.model';
import { Task } from '../resources/task/task.model';
import { Reservation } from '../resources/reservations/reservations.model';
import bcrypt from 'bcrypt';

export default async () => {
  if (config.isProd) {
  } else {
    const seedowner = new Promise((resolve, reject) => {
      // eslint-disable-next-line handle-callback-err
      User.findOne({ username: 'test_owner' }, (err, owner) => {
        if (!owner) {
          User.create({
            role: 'owner',
            username: 'test_owner',
            password: '12345',
            email: 'owner@roostr.io',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            billingPlan: 'free',
            phone: '994-567-4231',
            image: 'hxtgs6096v1ufbv0aulc',
            billingAddress: {
              address1: '1234 Honey Bear Ct',
              city: 'Tempe',
              state: 'AZ',
              zip: '57683'
            }
          })
            .then(created => {
              resolve(created);
            })
            .catch(err => {
              console.log(err);
              // eslint-disable-next-line prefer-promise-reject-errors
              reject(false);
            });
        } else {
          resolve(owner);
        }
      });
    });

    const seedEmployee = ownerId => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line handle-callback-err
        User.findOne({ username: 'test_employee' }, (err, employee) => {
          if (!employee) {
            User.create({
              role: 'employee',
              username: 'test_employee',
              password: '12345',
              email: 'employee@roostr.io',
              image: 'jidkfcrf00eivzefi8ot',
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
              // eslint-disable-next-line prefer-promise-reject-errors
              .catch(() => reject(false));
          } else {
            resolve(employee);
          }
        });
      });
    };

    const seedGuest = new Promise((resolve, reject) => {
      let hashedPass = '';
      // bcrypt.hash('12345', 8, (err, hash) => {
      //   if (err) {
      //     console.log('error hashing user seed password');
      //   }
      //   hashedPass = hash;
      // });
      // eslint-disable-next-line handle-callback-err
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
        // eslint-disable-next-line handle-callback-err
        Property.find({ createdBy: ownerId }, (err, properties) => {
          if (!properties.length) {
            let propertiesArr = [];
            const randomProps = [
              'u2xnww5ptxrsr2qqfiz3',
              'my37lb8zcxxtyktdjlgl',
              'yokmxu4uabgkbrk7pggk',
              'dxvyiutir83jaskrn1i8',
              'ydsdrfx78qkusaxkppnr',
              'lfuke0yxteew5aebswlq',
              'wfw92sbvhn8zmnojxxl3',
              'qaapqybhmj9jbaca7cwa',
              'n5rnk23bhajconqyklrq',
              'j7xfajetkajrcs7r2y2x',
              'jnoal9mbvl9lhkr4ddh6',
              'bqsixfim3eixmqbeqbei',
              't8wwefrk7dw7elsbta9y',
              'ogahorlfp8c1kttpvc6x'
            ];

            for (let i = 0; i < 5; i++) {
              var randomImage =
                randomProps[Math.floor(Math.random() * randomProps.length)];
              propertiesArr.push({
                name: 'House ' + (i + 1),
                assistants: [employeeId],
                active: true,
                createdBy: ownerId,
                address1: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
                price: faker.random.number({ min: 50, max: 1000 }),
                occupants: faker.random.number({ min: 1, max: 10 }),
                image: randomImage,
                cleaningFee: faker.random.number({ min: 20, max: 100 })
              });
            }
            // eslint-disable-next-line handle-callback-err
            Property.insertMany(propertiesArr, (err, docs) => {
              resolve(docs);
            });
          } else {
            resolve(properties);
          }
        });
      });
    };

    const seedTasks = (ownerId, employeeId, properties, reservations) => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line handle-callback-err
        Task.find({ createdBy: ownerId }, (err, tasks) => {
          if (!tasks.length) {
            let promiseArr = [];

            for (let i = 0; i < properties.length; i++) {
              let tasksArr = [];
              const reservation = reservations.find(
                r => r.property.toString() === properties[i]._id.toString()
              );

              for (let n = 0; n < 5; n++) {
                tasksArr.push({
                  createdBy: ownerId,
                  description: faker.lorem.sentence(),
                  property: properties[i]._id,
                  completed: false,
                  startDate: faker.date.soon(),
                  endDate: faker.date.future(),
                  status: 'upcoming',
                  reservation: reservation ? reservation._id : null,
                  assignedTo: employeeId
                });
              }

              for (let n = 0; n < 2; n++) {
                tasksArr.push({
                  createdBy: ownerId,
                  description: faker.lorem.sentence(),
                  property: properties[i]._id,
                  completed: false,
                  startDate: faker.date.recent(),
                  endDate: faker.date.soon(),
                  status: 'due today',
                  reservation: reservation ? reservation._id : null,
                  assignedTo: employeeId
                });
              }

              for (let n = 0; n < 2; n++) {
                tasksArr.push({
                  createdBy: ownerId,
                  description: faker.lorem.sentence(),
                  property: properties[i]._id,
                  completed: false,
                  startDate: faker.date.past(),
                  endDate: faker.date.recent(),
                  status: 'overdue',
                  reservation: reservation ? reservation._id : null,
                  assignedTo: employeeId
                });
              }

              promiseArr.push(
                new Promise((rs, rj) => {
                  // eslint-disable-next-line handle-callback-err
                  Task.insertMany(tasksArr, (err, docs) => {
                    rs(docs);
                  });
                })
              );
            }

            // eslint-disable-next-line promise/catch-or-return
            Promise.all(promiseArr).then(([insertedTasks]) =>
              resolve(insertedTasks)
            );
          } else {
            resolve(tasks);
          }
        });
      });
    };

    const seedReservations = (ownerId, guestId, assistantId, properties) => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line handle-callback-err
        Reservation.find({ createdBy: ownerId }, (err, reservations) => {
          if (!reservations.length) {
            let promiseArr = [];

            for (let property of properties) {
              let reservationsArr = [];
              reservationsArr.push({
                createdBy: ownerId,
                assistant: assistantId,
                guest: {
                  firstName: faker.name.firstName(),
                  lastName: faker.name.lastName(),
                  phoneNumber: faker.phone.phoneNumber(),
                  email: faker.internet.email()
                },
                property: property._id,
                checkIn: faker.date.soon(),
                checkOut: faker.date.future(),
                status: 'upcoming',
                nights: faker.random.number({ min: 1, max: 5 }),
                cleaningFee: faker.random.number({ min: 10, max: 100 }),
                guests: faker.random.number({ min: 1, max: 4 }),
                paid: true,
                guestLoginCode: faker.random.uuid()
              });

              reservationsArr.push({
                createdBy: ownerId,
                assistant: assistantId,
                guest: {
                  firstName: faker.name.firstName(),
                  lastName: faker.name.lastName(),
                  phoneNumber: faker.phone.phoneNumber(),
                  email: faker.internet.email()
                },
                property: property._id,
                checkIn: faker.date.recent(),
                checkOut: faker.date.soon(),
                status: 'incomplete',
                nights: faker.random.number({ min: 1, max: 5 }),
                cleaningFee: faker.random.number({ min: 10, max: 100 }),
                guests: faker.random.number({ min: 1, max: 4 }),
                paid: true,
                guestLoginCode: faker.random.uuid()
              });

              reservationsArr.push({
                createdBy: ownerId,
                assistant: assistantId,
                guest: {
                  firstName: faker.name.firstName(),
                  lastName: faker.name.lastName(),
                  phoneNumber: faker.phone.phoneNumber(),
                  email: faker.internet.email()
                },
                property: property._id,
                checkIn: faker.date.past(),
                checkOut: faker.date.recent(),
                status: 'complete',
                nights: faker.random.number({ min: 1, max: 5 }),
                cleaningFee: faker.random.number({ min: 10, max: 100 }),
                guests: faker.random.number({ min: 1, max: 4 }),
                paid: true,
                guestLoginCode: faker.random.uuid()
              });

              promiseArr.push(
                new Promise((rs, rj) => {
                  // eslint-disable-next-line handle-callback-err
                  Reservation.insertMany(reservationsArr, (err, docs) => {
                    rs(docs);
                  });
                })
              );
            }

            // eslint-disable-next-line promise/catch-or-return
            Promise.all(promiseArr).then(insertedReservations => {
              resolve(insertedReservations.flat(1));
            });
          } else {
            resolve(reservations);
          }
        });
      });
    };

    const seedEmployees = ownerId => {
      return new Promise((resolve, reject) => {
        User.find(
          { createdBy: ownerId, role: 'employee' },
          // eslint-disable-next-line handle-callback-err
          (err, employees) => {
            if (employees.length <= 1) {
              let employeesArr = [];
              const randomEmpl = [
                'fd4ilbduytewosd43kpw',
                'jwzzwwzkwxh0faqpkdyl',
                'ibarykx1xd3b0yclxmyp',
                'jgxlsiqot2lmruxjyvqt',
                'yse3sfyxc9nvhwkih2h2',
                'mipbwzuskkss0derhr0m',
                'fkfnugasyfuxdfdy7w8w',
                'ogp468masfyaes7yf40g',
                'fqzog3qmktxb4qwfcbmh',
                'kfofi74jznj6xu4wnfdw',
                'jsqm7dlwepu9uta1ni5p',
                'lcxiaryn2b1hz39yodpm',
                'g7gwvny96fy9fllcbpik',
                'i1bwyrcrs3wjoibiujna',
                'ehgmxhrvsnfbujlm7xgw',
                'g7oezvjfw9syvxwud709',
                'ftagy5asv5n6zleonuty',
                'uijlxpehmgetfgsoelm5'
              ];

              for (let i = 0; i < 10; i++) {
                const fakeName = faker.internet.userName();
                var randomImage =
                  randomEmpl[Math.floor(Math.random() * randomEmpl.length)];
                employeesArr.push({
                  role: 'employee',
                  username: fakeName,
                  password: '12345',
                  email: `${fakeName}@roostr.io`,
                  image: randomImage,
                  permissions: {
                    task: faker.random.boolean(),
                    property: faker.random.boolean(),
                    checkout: faker.random.boolean()
                  },
                  createdBy: ownerId,
                  firstName: faker.name.firstName(),
                  lastName: faker.name.lastName()
                });
              }

              // eslint-disable-next-line handle-callback-err
              User.insertMany(employeesArr, (err, docs) => {
                resolve(docs);
              });
            } else {
              resolve(employees);
            }
          }
        );
      });
    };

    const [owner, guest] = await Promise.all([seedowner, seedGuest]);

    const employee = await seedEmployee(owner._id);
    const properties = await seedProperties(owner._id, employee._id);
    const reservations = await seedReservations(
      owner._id,
      guest._id,
      employee._id,
      properties
    );

    const tasks = await seedTasks(
      owner._id,
      employee._id,
      properties,
      reservations
    );

    const employees = await seedEmployees(owner._id);

    console.log('Seeded owner     :   ', !!owner._id);
    console.log('Seeded main employee :   ', !!employee._id);
    console.log('Seeded guest     :   ', !!guest._id);
    console.log('Seeded properties   :   ', !!properties[0]);
    console.log('Seeded tasks     :   ', !!tasks[0]);
    console.log('Seeded reservations  :   ', !!reservations[0]);
    console.log('Seeded extra employees:   ', !!employees[1]);

    return tasks;
  }
};
