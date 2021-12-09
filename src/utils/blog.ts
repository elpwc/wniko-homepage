import init_debug_data from '../staticData/initDebugData';

export default interface Blog {
  id: number;
  title: string;
  author: string;
  viewCount: number;
  subject: number;
  lang: string;
  location: string;
  content: string;
  access: 'public' | 'urasekai' | 'private';
  createTime: Date;
  updateTime: Date;
}

export class BlogUtils {
  static create(title: string, content: string, author: string = 'wniko', id: number = 0, access: 'public' | 'urasekai' | 'private' = 'public') {
    return {
      id: id,
      title: title,
      author: author,
      viewCount: 0,
      subject: 0,
      lang: 'zh_cn',
      location: '',
      content: content,
      access: access,
      createTime: new Date(),
      updateTime: new Date(),
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
