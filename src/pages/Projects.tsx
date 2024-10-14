import React, { useEffect, useRef, useState } from 'react';
import ProjectList from '../components/ProjectList';
import { CurrentPageStorage, AdminModeStorage, LangStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';

import LangUtils, { Lang } from '../lang/langUtils';
import { static_projects_ja, static_projects_zh_cn } from '../staticData/projects';
import { StaticProject } from '../utils/staticProject';
import { ProjectIcons } from '../resourcesReader/projectIconReader';

import './Projects.css';
import { MainProjects } from '../staticData/mainProjects';
import { Link } from 'react-router-dom';

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
  const [projects, setProjects]: [StaticProject[], any] = useState([]);

  const L = LangUtils.selectLang();

  const getProjectListByLang = () => {
    console.log(LangStorage.value);
    switch (LangStorage.value) {
      case Lang.zh_cn:
        setProjects(static_projects_ja);
        break;
      case Lang.ja:
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
    <div>
      <div className="mainProjectContainer">
        <div className="mainProjectList">
          {MainProjects.map(mainProject => {
            return (
              <Link to={'../blogs/' + mainProject.blogId}>
                <div className="mainProjectCard">
                  <div className="iconImgContainer">
                    <img src={mainProject.icon} alt={mainProject.name} />
                  </div>
                  <div className="mainProjectName">{mainProject.name}</div>
                  <div className="mainProjectDesc">{mainProject.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <p style={{ fontSize: '25px' }}>All Projects</p>
      </div>

      <ProjectList
        update={update}
        setUpdate={() => {
          setUpdate(!update);
        }}
        projects={projects}
      />
    </div>
  );
}
