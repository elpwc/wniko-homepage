import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import Project from "../components/ProjectCard";
import ProjectList from "../components/ProjectList";
import { CurrentPageStorage } from "../dataStorage/storage";

export default function Projects() {
  useEffect(() => {
    CurrentPageStorage.set('projects');
}, []);
  const [update, setUpdate]: [boolean, any] = useState(false);
  return (
    <>
      <ProjectList
        update={update}
        setUpdate={() => {
          setUpdate(!update);
        }}
      />
    </>
  );
}
