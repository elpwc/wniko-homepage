import init_debug_data from '../staticData/initDebugData';
import BlogSubject, { BlogSubjectUtils } from './blogSubject';

export default interface Blog {
  id: number;
  title: string;
  author: string;
  viewCount: number;
  subjectId: number;
  lang: string;
  location: string;
  content: string;
  headPageUrl: string;
  access: 'public' | 'urasekai' | 'private';
  createTime: string;
  updateTime: string;
  isDraft: boolean;
}

export class BlogUtils {
  static create(
    title: string,
    content: string,
    author: string = 'wniko',
    id: number = 0,
    subjectId: number = 0,
    lang: string = 'zh-cn',
    location: string = '',
    access: 'public' | 'urasekai' | 'private' = 'public',
    headPageUrl: string = '',
    isDraft: boolean = false
  ) {
    return {
      id: id,
      title: title,
      author: author,
      viewCount: 0,
      subjectId: subjectId,
      lang: lang,
      location: location,
      content: content,
      access: access,
      headPageUrl: headPageUrl,
      createTime: new Date().toUTCString(),
      updateTime: new Date().toUTCString(),
      isDraft: isDraft,
    };
  }

  static exist(id: number): boolean {
    let res = false;
    init_debug_data.blogs.forEach((b) => {
      if (b.id === id) {
        res = true;
      }
    });
    return res;
  }
}
