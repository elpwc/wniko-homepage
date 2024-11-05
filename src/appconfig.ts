import { Lang } from './lang/langUtils';

export const IS_DEBUG = true;

export default {
  usingLanguages: [Lang.en, Lang.ja, Lang.zh_cn, Lang.zh_tw],
  api: {
    url: IS_DEBUG ? 'http://localhost:8001/api/v1' : 'http://localhost:8001/api/v1',
    project: '/projects',
    blog: '/blogs',
    blogsubject: '/blog-subjects',
  },
};
