import { Lang } from './lang/langUtils';

export const IS_DEBUG = false;

export default {
  usingLanguages: [Lang.en, Lang.ja, Lang.zh_cn, Lang.zh_tw],
  api: {
    url: IS_DEBUG ? 'http://localhost:8002/api/v1' : 'https://www.elpwc.com/server/homepage/api/v1',
    project: '/projects',
    blog: '/blogs',
    blogsubject: '/blog-subjects',
  },
};
