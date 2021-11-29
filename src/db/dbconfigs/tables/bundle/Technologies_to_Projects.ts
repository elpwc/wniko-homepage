import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_Technologies_to_Projects(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    'Technologies_to_Projects',
    {
      tid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      pid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: 'Technologies_to_Projects',
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
