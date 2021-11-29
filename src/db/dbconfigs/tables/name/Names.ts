import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_Names(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    'Name',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(16),
        defaultValue: 'none' /* none, waza, kaiwai, uchishi, kei, article */,
        allowNull: false,
      },
      main_lang: {
        type: DataTypes.STRING(16),
        defaultValue: 'zh_cn',
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
