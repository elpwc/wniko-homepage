export default interface BlogComment {
  id: number;
  name: string;
  email: string;
  content: string;
  like: number;
  dislike: number;
  lang: string;
  blogid: number;
  parentCommentId: number;
  access: 'public' | 'urasekai' | 'private';
}

export class BlogCommentUtils {
  static create(content: string, blogid: number, name: string = '', email: string = '', access: 'public' | 'urasekai' | 'private' = 'public') {
    return {
      id: 0,
      name: name,
      email: email,
      content: content,
      like: 0,
      dislike: 0,
      lang: 'zh_cn',
      blogid: blogid,
      parentCommentId: 0,
      access: 'public',
    };
  }
}
