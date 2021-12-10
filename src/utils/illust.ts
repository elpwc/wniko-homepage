export default interface Illust {
    id: number;
    thumburl: string;
    url: string;
    pixivurl: string;
    title: string;
    description: string;
    tags: string[];
    access: 'public' | 'urasekai' | 'private';
  }
  
  export class IllustUtils {
    static create(id: number, title: string, description: string = '', access: 'public' | 'urasekai' | 'private' = 'public',tags: string[] = [],url :string = '', thumburl: string = '' ,pixivurl: string = '') {
      return {
        id: id,
        title: title,
        tags: tags,
        description: description,
        thumburl : thumburl,
        url : url,
        pixivurl : pixivurl,
        access: 'public',
      };
    }
  }
  