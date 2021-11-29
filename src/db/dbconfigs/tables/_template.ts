import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    '',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      tableName: '',
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
