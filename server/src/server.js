import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import { connect } from './utils/db';
import { statusHandler } from './utils/errorHandler';
import { publicRouter, protectedRouter } from './resources/router';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

publicRouter(app);
protectedRouter(app);
app.use(statusHandler);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log('------------------------------------');
      console.log(`API Up and Running on PORT: ${config.port}`);
      console.log('------------------------------------');
    });
  } catch (e) {
    console.error(e);
  }
};
