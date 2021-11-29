import * as ZhCn from './zh_cn.json';
import * as Ja from './ja.json';
import { LangStorage, ProjectsStorage } from '../dataStorage/storage';

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
      case Lang.ja:
        // @ts-ignore
        return Ja.default;
      default:
        // @ts-ignore
        return ZhCn.default;
    }
  }

  // enum字符串转换为语言称呼
  static enumStrToLangName(str: string, lang?: Lang | undefined): string {
    const L = this.selectLang(lang);
    switch (this.enumStrToLang(str)) {
      case Lang.zh_cn:
        return L.utils.langs.zh_cn;
      case Lang.zh_tw:
        return L.utils.langs.zh_tw;
      case Lang.ja:
        return L.utils.langs.ja;
      case Lang.ko:
        return L.utils.langs.ko;
      case Lang.en:
        return L.utils.langs.en;
      default:
        return L.utils.langs.zh_cn;
    }
  }

  static enumStrToLang(str: string): Lang {
    switch (str) {
      case 'zh_cn':
        return Lang.zh_cn;
      case 'zh_tw':
        return Lang.zh_tw;
      case 'ja':
        return Lang.ja;
      case 'ko':
        return Lang.ko;
      case 'en':
        return Lang.en;
      default:
        return Lang.zh_cn;
    }
  }

  // 获取包含所有enum值的字符串数组
  static getEnumStrings(): string[] {
    return Object.keys(Lang).filter((k) => typeof Lang[k as any] === 'number');
  }
}
