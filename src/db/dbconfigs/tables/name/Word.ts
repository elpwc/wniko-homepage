import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_Words(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    'Word',
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
        type: DataTypes.STRING(1024),
      },
      ruby: {
        type: DataTypes.STRING(1024),
      },
      rank: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1,
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
