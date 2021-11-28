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
}
