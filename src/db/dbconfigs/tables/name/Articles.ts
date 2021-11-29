import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_Articles(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    'Article',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      lang_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(10240),
      },
      author: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
