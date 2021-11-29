import Technology from "./technology";

export enum DevState {
  Empty,
  Developping,
  Planning,
  Done,
  Dispose,
}

export default interface Project {
  name: string;
  devState: DevState;
  url: string;
  githubUrl: string;
  description: string;
  startDate: any;
  version: string;
  technologies: Technology[];
}

export class ProjectUtils {
  static create(name: string, description: string = '',devState: DevState = DevState.Planning, technologies: Technology[] = [],  githubUrl: string = '', url: string = '', version: string = '', startDate: string = '202101011180000'): Project{
    return {
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