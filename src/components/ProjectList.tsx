import React from 'react';
import Project from '../utils/project';
import ProjectCard from './ProjectCard';
import { LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';

interface P {
  update: boolean;
  setUpdate: () => void;

  projects: Project[];
}

export default function ProjectList(props: P) {
  return (
    <>
      <Space direction='vertical' style={{ width: '-webkit-fill-available' }}>
        {props.projects.map((project: Project) => {
          return <ProjectCard project={project} />;
        })}
      </Space>
    </>
  );
}
