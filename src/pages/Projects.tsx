import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import Project from '../components/ProjectCard';
import ProjectList from '../components/ProjectList';
import RightContent from '../components/RightContent';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import axios from 'axios';

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
        projects={init_debug_data.projects}
      />
      <RightContent update={update} setUpdate={()=>{setUpdate(!update)}}>
        <Button onClick={() => {
          axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/projects',
            data: {
              name: 'test projects 1',
              description: 'test, 嗯！',
              url: '#',
              headImageUrl: '#',
              githuburl: '#',
              starttime: new Date(),
              version: 'az',
              technologies: 'a|a'
            }
          });
        }}>add</Button>
      </RightContent>
    </>
  );
}
