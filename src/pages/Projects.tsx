import { Button, Input } from "antd";
import { useState } from "react";
import Project from "../components/ProjectCard";
import ProjectList from "../components/ProjectList";

export default function Projects() {
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
