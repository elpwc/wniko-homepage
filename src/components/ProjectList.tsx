import React from 'react';
import Project from '../utils/project';
import ProjectCard from './ProjectCard';
import { LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';
import { StaticProject } from '../utils/staticProject';

interface P {
  update: boolean;
  setUpdate: () => void;

  projects: StaticProject[];
}

export default function ProjectList(props: P) {
  return (
    <>
      <Space direction="vertical" style={{ width: '-webkit-fill-available' }}>
        {props.projects.map((project: StaticProject) => {
          return <ProjectCard project={project} key={project.name} />;
        })}
      </Space>
    </>
  );
}
