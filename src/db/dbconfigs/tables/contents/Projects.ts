import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_Projects(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      start_datetime: {
        type: DataTypes.TIME,
      },
      description: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      state: {
        //
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      url: {
        type: DataTypes.STRING(1024),
      },
      githuburl: {
        type: DataTypes.STRING(1024),
      },
      version: {
        type: DataTypes.STRING(256),
      },
      like: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
