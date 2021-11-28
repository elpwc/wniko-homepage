import * as ZhCn from "./zh_cn.json";
import { LangStorage, ProjectsStorage } from "../dataStorage/storage";

export enum Lang {
  zh_cn,
  zh_tw,
  ja,
  ko,
  en,
}

export default class LangUtils {
  static selectLang(currentLang?: Lang | undefined) {
    if (currentLang === undefined) {
      currentLang = LangStorage.value;
    }
    switch (currentLang) {
      case Lang.zh_cn:
        // @ts-ignore
        return ZhCn.default;
      default:
        // @ts-ignore
        return ZhCn.default;
    }
  }
}
