import init_debug_data from '../staticData/initDebugData';
import BlogSubject, { BlogSubjectUtils } from './blogSubject';

export class BlogUtils {
  static create(
    title: string,
    content: string,
    author: string = 'wniko',
    id: number = 0,
    subject: string = '',
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
      subject: subject,
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

  static initializeBlog(): API.Blog {
    return {
      id: 0,
      title: '',
      author: '',
      viewCount: 0,
      lang: '',
      location: '',
      content: '',
      headPageUrl: '',
      access: 'public',
      isDraft: true,
      subject: '',
      createtime: new Date().toISOString(),
      updatetime: new Date().toISOString(),
    };
  }

  static exist(id: number): boolean {
    let res = false;

    return res;
  }
}
