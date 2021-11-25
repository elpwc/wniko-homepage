export enum DevState {
  Empty,
  Developping,
  Planning,
  Done,
}

export default interface Project {
  name: string;
  devState: DevState;
  url: string;
  githubUrl: string;
  description: string;
  startDate: any;
}
