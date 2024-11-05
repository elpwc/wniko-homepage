import ProjectCard from './ProjectCard';
import { LangStorage } from '../dataStorage/storage';
import { StaticProject } from '../utils/staticProject';

interface P {
  update: boolean;
  setUpdate: () => void;

  projects: StaticProject[];
}

export default function ProjectList(props: P) {
  return (
    <div style={{ width: '-webkit-fill-available' }}>
      {props.projects.map((project: StaticProject) => {
        return <ProjectCard project={project} key={project.name} />;
      })}
    </div>
  );
}
