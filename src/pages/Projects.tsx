import { Button, Input } from "antd";
import { useState } from "react";
import Project from "../components/Project";

export default function Projects() {
  const [name, setName]: [string, any] = useState("114");
  return (
    <>
      <Input
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></Input>
      <Button
        onClick={() => {
          alert();
        }}
      >
        test
      </Button>
      <Project name={name} url="" githubUrl="" />
    </>
  );
}
