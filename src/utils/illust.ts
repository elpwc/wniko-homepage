export enum IllustType {
  Default,
  Illust,
  Map,
  Photo,
  Meal,
  Junrei,
  None,
}

export default interface IllustObj {
  thumburl: string;
  url: string;
  pixivurl?: string;
  title: string;
  description?: string;
  nsfw?: boolean;
  date?: string;
  type: IllustType[];
}

export class IllustUtils {
  static create(
    title: string,
    description: string = '',
    url: string = '',
    thumburl: string = '',
    pixivurl: string = '',
    type: IllustType[] = [IllustType.Default],
    date: string = '',
    nsfw: boolean = false
  ): IllustObj {
    return {
      title,
      description,
      thumburl,
      url,
      pixivurl,
      type,
      date,
      nsfw,
    };
  }
}
