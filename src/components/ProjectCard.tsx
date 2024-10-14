import Project, { DevState } from '../utils/project';
import { LangStorage } from '../dataStorage/storage';
import LangUtils from '../lang/langUtils';
import './ProjectCard.css';
import { StaticProject } from '../utils/staticProject';
interface P {
  project: StaticProject;
}

export default function ProjectCard(props: P) {
  const L = LangUtils.selectLang();
  const getStateBox = (state: DevState) => {
    let bgcolor = 'green';
    let forecolor = 'white';
    let title = '';
    let classNameForStatus = '';
    switch (state) {
      case DevState.Empty:
        bgcolor = 'white';
        forecolor = 'black';
        title = L.utils.devstates.empty;
        break;
      case DevState.Planning:
        bgcolor = '#faad14';
        classNameForStatus = 'plan';
        title = L.utils.devstates.planning;
        break;
      case DevState.Developing:
        bgcolor = '#eb2f96';
        classNameForStatus = 'developing';
        title = L.utils.devstates.developing;
        break;
      case DevState.Done:
        bgcolor = '#52c41a';
        classNameForStatus = 'complete';
        title = L.utils.devstates.done;
        break;
      case DevState.Deprecated:
        bgcolor = '#868686';
        classNameForStatus = 'obsoleted';
        title = L.utils.devstates.obsoleted;
        break;
      case DevState.MaintainingStopped:
        bgcolor = '#868686';
        classNameForStatus = 'notmaintaining';
        title = L.utils.devstates.maintainingstopped;
        break;
      default:
        break;
    }

    return (
      <div
        className={classNameForStatus}
        style={{
          width: 'fit-content',
          paddingLeft: '5px',
          paddingRight: '5px',
          borderWidth: 0,
        }}
      >
        {title}
      </div>
    );
  };

  const getRandColor = () => {
    return `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`;
  };

  return (
    <>
      <section className="projectContainer">
        <div className="titlebar">
          <div className="title">
            {getStateBox(props.project.status)}

            {props.project.url !== '' ? (
              <a className="linkable projectTitle" href={props.project.url} target="_blank">
                {props.project.name}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                  ></path>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"></path>
                </svg>
              </a>
            ) : (
              <p className="projectTitle">{props.project.name}</p>
            )}
          </div>
          <div className="link">
            {props.project.github !== '' ? (
              <a href={props.project.github} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                GitHub
                <span>
                  <sup>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                      ></path>
                      <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"></path>
                    </svg>
                  </sup>
                </span>
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="desc">
          <article>
            <p className="tags">{props.project.tags}</p>
            <p className="desctext">{props.project.desc}</p>
          </article>

          <img src={props.project.image} width={props.project.imageWidth} height="40%" />
        </div>
      </section>
    </>
  );
}
