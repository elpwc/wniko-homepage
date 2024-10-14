import { DevState } from './project';

export interface StaticProject {
  name: string;
  url: string;
  github: string;
  status: DevState;
  desc: string | JSX.Element;
  image: string;
  imageWidth?: string;
  tags?: string;
  icon?: string;
}
