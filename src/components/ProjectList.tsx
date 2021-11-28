import React from "react";
import Project from "../utils/project";
import ProjectCard from "./ProjectCard";
import { LangStorage, ProjectsStorage } from "../dataStorage/storage";
import { Space } from "antd";

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function ProjectList(props: P) {
  return (
    <>
      <Space direction="vertical" style={{width: '-webkit-fill-available'}}>
        {ProjectsStorage.value.map((project: Project) => {
          return <ProjectCard project={project} />;
        })}
      </Space>
    </>
  );
}
