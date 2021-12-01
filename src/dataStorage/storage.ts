import { Lang } from '../lang/langUtils';
import Blog from '../utils/blog';
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

export const BlogsStorage: Storage<Blog[]> = new Storage<Blog[]>([]);

export const CurrentPageStorage: Storage<string> = new Storage<string>('home');

export const AdminModeStorage: Storage<number> = new Storage<number>(0); // 0 not admin, 1 open requireWin, 2 admin mode

export const DeviceStorage: Storage<number> = new Storage<number>(0); // 0 pc, 1 mobile
