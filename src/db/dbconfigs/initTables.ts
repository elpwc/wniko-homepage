import { Sequelize } from 'sequelize/dist';
import { init_Names } from './tables/name/Names';
import { init_Langs } from './tables/name/Langs';
import { init_Words } from './tables/name/Word';
import { init_Articles } from './tables/name/Articles';

import { Tables } from './tables';
import { init_Projects } from './tables/contents/Projects';
import { init_Technologies } from './tables/contents/Technologies';
import { init_Technologies_to_Projects } from './tables/bundle/Technologies_to_Projects';

export function initTables(seq: Sequelize): Tables {
  //name
  return {
    Names: init_Names(seq),
    Langs: init_Langs(seq),
    Words: init_Words(seq),
    Articles: init_Articles(seq),

    Projects: init_Projects(seq),
    Technologies: init_Technologies(seq),

    Technologies_to_Projects: init_Technologies_to_Projects(seq),
  };
}
