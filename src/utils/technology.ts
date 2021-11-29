export default interface Technology {
    name: string;
    url: string;
    color: string;
  }
  
  export class TechnologyUtils {
    static create(name: string, color: string = 'white', url: string = ''): Technology{
      return {
        name: name,
        url: url,
        color: color,
      };
    }
  }