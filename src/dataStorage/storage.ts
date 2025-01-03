import { Lang } from '../lang/langUtils';

// Provides a way to share data globally.
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

// Current showing language
export const LangStorage: Storage<Lang> = new Storage<Lang>(0);

// Current showing page keyname
export const CurrentPageStorage: Storage<string> = new Storage<string>('home');

// Current user mode.
// To distinguish exploring user identity.
export const AdminModeStorage: Storage<number> = new Storage<number>(0); // 0 not admin, 1 admin mode

// Running device
export const DeviceStorage: Storage<number> = new Storage<number>(0); // 0 pc, 1 mobile
