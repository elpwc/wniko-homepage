import { Button, Input, Modal, Form, FormInstance } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Project from '../components/ProjectCard';
import ProjectList from '../components/ProjectList';
import RightContent from '../components/RightContent';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import axios from 'axios';
import appconfig from '../appconfig';
import ModalForm from '../components/ModalForm';

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
  const [newProjectModalVisibility, setNewProjectModalVisibility]: [boolean, any] = useState(false);

  const onProjectSubmit = (values: any) => {
    console.log(values);
  };

  const onProjectSubmitFailed = (errorInfo: any) => {};

  return (
    <>
      <ProjectList
        update={update}
        setUpdate={() => {
          setUpdate(!update);
        }}
        projects={init_debug_data.projects}
      />
      <RightContent
        update={update}
        setUpdate={() => {
          setUpdate(!update);
        }}
      >
        <>
          <ModalForm
            title={'加入新项目'}
            visible={newProjectModalVisibility}
            onSubmit={onProjectSubmit}
            onCancel={() => {
              setNewProjectModalVisibility(false);
            }}
            okButtonTitle='确定'
            cancelButtonTitle='取消'
            items={[
              { name: 'name', label: '项目名称', child: <Input /> },
              { name: 'desc', label: '说明', child: <Input /> },
            ]}
          />

          <Button
            onClick={() => {
              /*
              axios({
                method: 'post',
                url: `${appconfig.serverApiUrl}/projects`,
                data: {
                  name: 'test projects 1',
                  description: 'test, 嗯！',
                  url: '#',
                  headImageUrl: '#',
                  githuburl: '#',
                  starttime: new Date(),
                  version: 'az',
                  technologies: ['a', 'b'],
                },
              });
              */
              setNewProjectModalVisibility(!newProjectModalVisibility);
            }}
          >
            add
          </Button>
        </>
      </RightContent>
    </>
  );
}


