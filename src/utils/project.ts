export enum DevState {
  Empty,
  Developping,
  Planning,
  Done,
  Dispose,
}

export default interface Project {
  id: number;
  name: string;
  devState: DevState;
  url: string;
  githubUrl: string;
  description: string;
  startDate: Date;
  version: string;
  technologies: string[];
}

export class ProjectUtils {
  static create(
    name: string,
    description: string = '',
    devState: DevState = DevState.Planning,
    technologies: string[] = [],
    githubUrl: string = '',
    url: string = '',
    version: string = '',
    startDate: Date = new Date()
  ): Project {
    return {
      id: 0,
      name: name,
      description: description,
      url: url,
      githubUrl: githubUrl,
      devState: devState,
      version: version,
      startDate: startDate,
      technologies: technologies,
    };
  }
}
