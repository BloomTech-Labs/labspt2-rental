import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import { connect } from './utils/db';
import { statusHandler } from './utils/errorHandler';
import {
  publicRouter,
  protectedRouter,
  sendGridRouter
} from './resources/router';
import seed from './utils/seed';

export const app = express();
try {
  app.use(
    cors({
      origin: [config.origin],
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      credentials: true
    })
  );
  app.use(morgan('dev'));
  app.use(express.json());
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded({ extended: false }));

  sendGridRouter(app);
  publicRouter(app);
  protectedRouter(app);
  app.use(statusHandler);
} catch (e) {
  console.error(e);
}

export const start = async () => {
  try {
    await connect();
    await seed();
    app.listen(config.port, () => {
      console.log('------------------------------------');
      console.log(`API Up and Running on PORT: ${config.port}`);
      console.log('------------------------------------');
    });
  } catch (e) {
    console.error(e);
  }
};
