// Subject of a blog.
export default interface BlogSubject {
  id: number;
  title: string;
  description: string;
  access: 'public' | 'urasekai' | 'private';
}

export class BlogSubjectUtils {
  static create(id: number, title: string, description: string = '', access: 'public' | 'urasekai' | 'private' = 'public') {
    return {
      id: id,
      title: title,
      description: description,
      access: 'public' as 'public' | 'urasekai' | 'private',
    };
  }
}
