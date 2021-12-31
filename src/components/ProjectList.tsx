import React from 'react';
import Project from '../utils/project';
import ProjectCard from './ProjectCard';
import { LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';

interface P {
  update: boolean;
  setUpdate: () => void;

  projects: Project[];

  edit?: boolean;
  onDeleteClick?: (project: Project) => void;
  onEditClick?: (project: Project) => void;
  onPrivateChange?: (project: Project, isprivate: boolean) => void;
}

export default function ProjectList(props: P) {
  return (
    <>
      <Space direction='vertical' style={{ width: '-webkit-fill-available' }}>
        {props.projects.map((project: Project) => {
          return props.edit || !project.isprivate ? (
            <ProjectCard project={project} key={project.id} edit={props.edit} onDeleteClick={props.onDeleteClick} onEditClick={props.onEditClick} onPrivateChange={props.onPrivateChange} />
          ) : (
            <></>
          );
        })}
      </Space>
    </>
  );
}
