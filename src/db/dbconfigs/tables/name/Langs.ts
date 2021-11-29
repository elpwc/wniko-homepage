import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize/dist';

export function init_Langs(seq: Sequelize): ModelCtor<Model<any, any>> {
  return seq.define(
    'Lang',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name_id: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      lang_code: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  );
}
