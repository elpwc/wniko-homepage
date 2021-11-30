import { Sequelize, DataTypes } from 'sequelize/dist';
import * as DBCONFIG from './dbconfigs/config/dbconfig.debug.json';
import { initTables } from './dbconfigs/initTables';
import { Tables } from './dbconfigs/tables';

const seq = new Sequelize(DBCONFIG.dbname, DBCONFIG.username, DBCONFIG.password, {
  dialect: 'mysql',
  host: DBCONFIG.host,
  port: DBCONFIG.port,
  logging: true,
  timezone: '+08:00',
});

export default class DBUtils {
  // 各个表的实例
  static Tables: Tables | undefined = undefined;

  // 先初始化 再同步表
  static initAllTables() {
    this.Tables = initTables(seq);
  }

  // 同步表
  static async synchDB() {
    await seq.sync({ alter: true });
  }
}
