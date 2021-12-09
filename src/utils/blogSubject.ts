// Subject of a blog.
export default interface BlogSubject {
  id: number;
  title: string;
  description: string;
  access: 'public' | 'urasekai' | 'private';
}

export class BlogSubjectUtils {
  static create(title: string, description: string = '', access: 'public' | 'urasekai' | 'private' = 'public') {
    return {
      id: 0,
      title: title,
      description: description,
      access: 'public',
    };
  }
}
