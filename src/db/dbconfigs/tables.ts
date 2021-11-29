import { Model, ModelCtor } from 'sequelize/dist';

export interface Tables {
  Names: ModelCtor<Model<any, any>>;
  Langs: ModelCtor<Model<any, any>>;
  Words: ModelCtor<Model<any, any>>;
  Articles: ModelCtor<Model<any, any>>;

  Projects: ModelCtor<Model<any, any>>;
  Technologies: ModelCtor<Model<any, any>>;

  Technologies_to_Projects: ModelCtor<Model<any, any>>;
}
