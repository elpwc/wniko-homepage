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
}

export class BlogUtils {
  static create(title: string, content: string, author: string = 'wniko', access: 'public' | 'urasekai' | 'private' = 'public') {
    return {
      id: 0,
      title: title,
      author: author,
      viewCount: 0,
      subject: 0,
      lang: 'zh_cn',
      location: '',
      content: content,
      access: access,
    };
  }

  static exist(id: number): boolean{
    return false;
  }
}
