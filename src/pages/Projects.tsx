import { Button, Input, Modal, Form, FormInstance, DatePicker, Space, Tooltip, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ProjectList from '../components/ProjectList';
import RightContent from '../components/RightContent';
import { CurrentPageStorage, AdminModeStorage, LangStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import axios from 'axios';
import appconfig from '../appconfig';
import ModalForm from '../components/ModalForm';
import { PlusOutlined } from '@ant-design/icons';
import UniTag from '../components/UniTag/UniTag';
import LangUtils, { Lang } from '../lang/langUtils';
import moment, { Moment } from 'moment';
import api from '../api';
import { DevState, ProjectUtils } from '../utils/project';
import type Project from '../utils/project';
import { static_projects_ja, static_projects_zh_cn } from '../staticData/projects';
import { StaticProject } from '../utils/staticProject';

const { Option } = Select;

interface P {
  update: boolean;
  setUpdate: () => void;
}

//let editedProject: Project | null = null;

export default function Projects(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('projects');
    props.setUpdate();
  }, []);
  const [update, setUpdate]: [boolean, any] = useState(false);
  const [newProjectModalVisibility, setNewProjectModalVisibility]: [boolean, any] = useState(false);
  const [tagSelectValue, setTagSelectValue]: [string, any] = useState('');
  const [editedProject, setEditedProject]: [Project, any] = useState(ProjectUtils.create(''));
  const [edit, setEdit]: [boolean, any] = useState(false);

  const [projects, setProjects]: [StaticProject[], any] = useState([]);

  const L = LangUtils.selectLang();

  const getProjectListByLang = () => {
    console.log(LangStorage.value)
    switch (LangStorage.value) {
      case Lang.zh_cn:
        setProjects(static_projects_zh_cn);
        break;
      case Lang.ja:
        console.log(123)
        setProjects(static_projects_ja);
        break;
      case Lang.zh_tw:
        setProjects(static_projects_zh_cn);
        break;
      case Lang.en:
        setProjects(static_projects_zh_cn);
        break;
      default:
        setProjects(static_projects_zh_cn);
        break;
    }
  };

  useEffect(() => {
    getProjectListByLang();
  }, []);

  useEffect(() => {
    getProjectListByLang();
  }, [LangStorage.value]);

  return (
    <>
      <ProjectList
        update={update}
        setUpdate={() => {
          setUpdate(!update);
        }}
        projects={projects}
      />
      <RightContent
        update={update}
        setUpdate={() => {
          setUpdate(!update);
        }}
      >
        {AdminModeStorage.value === 1 ? (
          <div style={{ marginTop: '20px' }}>
            <ModalForm
              title={edit ? `修改${editedProject?.name}` : '加入新项目'}
              visible={newProjectModalVisibility}
              onSubmit={values => {}}
              onCancel={() => {
                setEditedProject(ProjectUtils.create(''));
                setEdit(false);
                setNewProjectModalVisibility(false);
              }}
              okButtonTitle="确定"
              cancelButtonTitle="取消"
              items={[
                { name: 'name', label: '项目名称', initialValue: edit ? editedProject?.name : '', child: <Input /> },
                { name: 'description', label: '说明', initialValue: edit ? editedProject?.description : '', child: <Input /> },
                {
                  name: 'technologies',
                  label: '使用的技术',
                  initialValue: edit ? editedProject?.technologies : [],
                  child: (
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="输入标签"
                      onSearch={e => {
                        setTagSelectValue(e);
                      }}
                    >
                      {tagSelectValue}
                    </Select>
                  ),
                },
                { name: 'url', label: 'URL', initialValue: edit ? editedProject?.url : '', child: <Input /> },
                { name: 'githuburl', label: 'Github URL', initialValue: edit ? editedProject?.githuburl : '', child: <Input /> },
                {
                  name: 'starttime',
                  label: '开始时间',
                  initialValue: edit ? moment(editedProject?.starttime) : moment(),
                  child: <DatePicker placeholder={'请选择日期'} defaultPickerValue={moment()} />,
                },
                { name: 'version', label: '最新版本', initialValue: edit ? editedProject?.version : '', child: <Input /> },
                {
                  name: 'state',
                  label: '开发状态',
                  initialValue: edit ? editedProject?.state : DevState.Planning,
                  child: (
                    <Select style={{ width: 120 }}>
                      <Option value={DevState.Planning}>{L.utils.devstates.planning}</Option>
                      <Option value={DevState.Developing}>{L.utils.devstates.developing}</Option>
                      <Option value={DevState.Done}>{L.utils.devstates.done}</Option>
                      <Option value={DevState.Dispose}>{L.utils.devstates.dispose}</Option>
                    </Select>
                  ),
                },
                { name: 'headImageUrl', label: '图标URL', initialValue: edit ? editedProject?.headImageUrl : '', child: <Input /> },
              ]}
            />

            <Button
              shape="circle"
              size="large"
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
        ) : (
          <></>
        )}
      </RightContent>
    </>
  );
}
