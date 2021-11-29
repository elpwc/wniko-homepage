import { Lang } from '../lang/langUtils';
import Project from '../utils/project';

class Storage<T> {
  constructor(defaultValue: T, functions?: {}) {
    this.value = defaultValue;
    if (functions) {
      this.functions = functions;
    }
  }
  public value!: T;
  public set = (newValue: T) => {
    this.value = newValue;
  };
  public functions = {};
}

export const LangStorage: Storage<Lang> = new Storage<Lang>(0);

export const ProjectsStorage: Storage<Project[]> = new Storage<Project[]>([]);

export const CurrentPageStorage: Storage<string> = new Storage<string>('home');
