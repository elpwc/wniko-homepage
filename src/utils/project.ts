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
  state: DevState;
  url: string;
  githuburl: string;
  description: string;
  starttime: string;
  version: string;
  technologies: string[];
  headImageUrl: string;
  isprivate: boolean;
}

export class ProjectUtils {
  static create(
    name: string,
    description: string = '',
    state: DevState = DevState.Planning,
    technologies: string[] = [],
    githuburl: string = '',
    url: string = '',
    version: string = '',
    starttime: string = new Date().toUTCString(),
    headImageUrl: string = '',
    isprivate: boolean = false
  ): Project {
    return {
      id: 0,
      name: name,
      description: description,
      url: url,
      githuburl: githuburl,
      state: state,
      version: version,
      starttime: starttime,
      technologies: technologies,
      headImageUrl: headImageUrl,
      isprivate: isprivate,
    };
  }
}
