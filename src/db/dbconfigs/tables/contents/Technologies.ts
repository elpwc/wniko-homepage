import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_Technologies(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    'Technology',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(256),
      },
      color: {
        type: DataTypes.STRING(64),
        defaultValue: 'lightblue',
      },
      url: {
        type: DataTypes.STRING(512),
        defaultValue: '',
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
