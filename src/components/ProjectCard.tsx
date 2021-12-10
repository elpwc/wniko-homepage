import { Card, Space, Tag, Tooltip } from 'antd';
import Project, { DevState } from '../utils/project';
import { LangStorage } from '../dataStorage/storage';
import LangUtils from '../lang/langUtils';
import { GithubOutlined, SendOutlined } from '@ant-design/icons';
import Technology from '../utils/technology';

interface P {
  project: Project;
}

export default function ProjectCard(props: P) {
  const L = LangUtils.selectLang();

  const getStateBox = (state: DevState) => {
    let bgcolor = 'green';
    let forecolor = 'white';
    let title = '';
    switch (state) {
      case DevState.Empty:
        bgcolor = 'white';
        forecolor = 'black';
        title = L.utils.devstates.empty;
        break;
      case DevState.Planning:
        bgcolor = '#faad14';
        title = L.utils.devstates.planning;
        break;
      case DevState.Developping:
        bgcolor = '#eb2f96';
        title = L.utils.devstates.developping;
        break;
      case DevState.Done:
        bgcolor = '#52c41a';
        title = L.utils.devstates.done;
        break;
      case DevState.Dispose:
        bgcolor = '#868686';
        title = L.utils.devstates.dispose;
        break;
      default:
        break;
    }

    return (
      <div
        style={{
          backgroundColor: bgcolor,
          color: forecolor,
          borderRadius: '5px',
          width: 'fit-content',
          paddingLeft: '5px',
          paddingRight: '5px',
        }}
      >
        {title}
      </div>
    );
  };

  return (
    <>
      <Card
        title={
          <>
            <a target='_blank' href={props.project.url} rel='noreferrer'>
              <span>{props.project.name}</span>
            </a>
          </>
        }
        extra={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Space>
              {props.project.url === '' ? (
                <></>
              ) : (
                <Tooltip placement='top' title='打开项目'>
                  <a target='_blank' href={props.project.url} rel='noreferrer'>
                    <span style={{ fontSize: '20px', color: 'green' }}>
                      <SendOutlined />
                    </span>
                  </a>
                </Tooltip>
              )}
              {props.project.githubUrl === '' ? (
                <></>
              ) : (
                <Tooltip placement='top' title='打开Github'>
                  <a target='_blank' href={props.project.githubUrl} rel='noreferrer'>
                    <span style={{ fontSize: '20px', color: 'black' }}>
                      <GithubOutlined />
                    </span>
                  </a>
                </Tooltip>
              )}

              {getStateBox(props.project.devState)}
            </Space>
          </div>
        }
        style={{}}
      >
        <Space direction='vertical'>
          <div>
            {props.project.technologies.map((tech: Technology) => {
              return (
                <a target='_blank' href={tech.url} rel='noreferrer' key={tech.name}>
                  <Tag style={{ fontSize: '10px' }} color={tech.color}>
                    {tech.name}
                  </Tag>
                </a>
              );
            })}
          </div>
          <div>
            <p>{props.project.description}</p>
          </div>
        </Space>
      </Card>
    </>
  );
}
