import { Card, Popconfirm, Space, Switch, Tag, Tooltip } from 'antd';
import Project, { DevState } from '../utils/project';
import { LangStorage } from '../dataStorage/storage';
import LangUtils from '../lang/langUtils';
import { GithubOutlined, SendOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface P {
  project: Project;
  edit?: boolean;
  onDeleteClick?: (project: Project) => void;
  onEditClick?: (project: Project) => void;
  onPrivateChange?: (project: Project, isprivate: boolean) => void;
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

  const getRandColor = () => {
    return `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`;
  };

  return (
    <>
      <Card
        title={
          <>
            <a target="_blank" href={props.project.url} rel="noreferrer">
              <span>{props.project.name}</span>
            </a>
          </>
        }
        extra={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Space>
              {props.edit ? (
                <>
                  <Switch
                    checkedChildren="公开"
                    unCheckedChildren="隐藏"
                    defaultChecked={!props.project.isprivate}
                    onChange={checked => {
                      props.onPrivateChange?.(props.project, !checked);
                    }}
                  />
                  <Tooltip placement="top" title="编辑">
                    <span
                      style={{ fontSize: '20px', color: 'blue', cursor: 'pointer' }}
                      onClick={() => {
                        props.onEditClick?.(props.project);
                      }}
                    >
                      <EditOutlined />
                    </span>
                  </Tooltip>
                  <Tooltip placement="top" title="删除">
                    <Popconfirm
                      title="确定永久删除吗？"
                      onConfirm={() => {
                        props.onDeleteClick?.(props.project);
                      }}
                      //onCancel={}
                      okText="删除"
                      cancelText="取消"
                    >
                      <span style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}>
                        <DeleteOutlined />
                      </span>
                    </Popconfirm>
                  </Tooltip>
                </>
              ) : (
                <></>
              )}
              {props.project.url === '' ? (
                <></>
              ) : (
                <Tooltip placement="top" title="打开项目">
                  <a target="_blank" href={props.project.url} rel="noreferrer">
                    <span style={{ fontSize: '20px', color: 'green' }}>
                      <SendOutlined />
                    </span>
                  </a>
                </Tooltip>
              )}
              {props.project.githuburl === '' ? (
                <></>
              ) : (
                <Tooltip placement="top" title="打开Github">
                  <a target="_blank" href={props.project.githuburl} rel="noreferrer">
                    <span style={{ fontSize: '20px', color: 'black' }}>
                      <GithubOutlined />
                    </span>
                  </a>
                </Tooltip>
              )}

              {getStateBox(props.project.state)}
            </Space>
          </div>
        }
        style={{}}
      >
        <Space direction="vertical">
          <div>
            {props.project.technologies.map((tech: string) => {
              return (
                <Tag style={{ fontSize: '10px' }} color={getRandColor()} key={tech}>
                  {tech}
                </Tag>
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
