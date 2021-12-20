import { Button, Input, Modal, Form, FormInstance, DatePicker, Space, Tooltip, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Project from '../components/ProjectCard';
import ProjectList from '../components/ProjectList';
import RightContent from '../components/RightContent';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import axios from 'axios';
import appconfig from '../appconfig';
import ModalForm from '../components/ModalForm';
import { PlusOutlined } from '@ant-design/icons';
import UniTag from '../components/UniTag/UniTag';
import LangUtils from '../lang/langUtils';
import moment from 'moment';

const { Option } = Select;

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
  const [tagSelectValue, setTagSelectValue]: [string, any] = useState('');

  const L = LangUtils.selectLang();

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
        <div style={{ marginTop: '20px' }}>
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
              {
                name: 'tech',
                label: '使用的技术',
                child: (
                  <Select
                    mode='tags'
                    style={{ width: '100%' }}
                    placeholder='输入标签'
                    onSearch={(e) => {
                      setTagSelectValue(e);
                    }}
                  >
                    {tagSelectValue}
                  </Select>
                ),
              },
              { name: 'url', label: 'URL', child: <Input /> },
              { name: 'githuburl', label: 'Github URL', child: <Input /> },
              { name: 'starttime', label: '开始时间', child: <DatePicker placeholder={'请选择日期'} defaultValue={moment()} defaultPickerValue={moment()} /> },
              { name: 'version', label: '最新版本', child: <Input /> },
              {
                name: 'state',
                label: '开发状态',
                child: (
                  <Select defaultValue='planning' style={{ width: 120 }}>
                    <Option value='planning'>{L.utils.devstates.planning}</Option>
                    <Option value='developping'>{L.utils.devstates.developping}</Option>
                    <Option value='done'>{L.utils.devstates.done}</Option>
                    <Option value='dispose'>{L.utils.devstates.dispose}</Option>
                  </Select>
                ),
              },
              { name: 'iconurl', label: '图标URL', child: <Input /> },
            ]}
          />

          <Button
            shape='circle'
            size='large'
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
            <PlusOutlined />
          </Button>
        </div>
      </RightContent>
    </>
  );
}
