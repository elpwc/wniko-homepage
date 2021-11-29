import { Sequelize, DataTypes } from 'sequelize/dist';
import * as DBCONFIG from './dbconfigs/config/dbconfig.debug.json';

const seq = new Sequelize(DBCONFIG.dbname, DBCONFIG.username, DBCONFIG.password, {
  dialect: 'mysql',
  host: DBCONFIG.host,
  port: DBCONFIG.port,
  logging: true,
  timezone: '+08:00',
});

