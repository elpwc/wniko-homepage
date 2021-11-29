import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import Project from "../components/ProjectCard";
import ProjectList from "../components/ProjectList";
import { CurrentPageStorage } from "../dataStorage/storage";

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Projects(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('projects');
props.setUpdate();
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
