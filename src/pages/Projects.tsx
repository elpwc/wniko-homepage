import { Button, Input, Modal, Form, FormInstance, DatePicker, Space, Tooltip, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ProjectList from "../components/ProjectList";
import RightContent from "../components/RightContent";
import { CurrentPageStorage, AdminModeStorage } from "../dataStorage/storage";
import init_debug_data from "../staticData/initDebugData";
import axios from "axios";
import appconfig from "../appconfig";
import ModalForm from "../components/ModalForm";
import { PlusOutlined } from "@ant-design/icons";
import UniTag from "../components/UniTag/UniTag";
import LangUtils from "../lang/langUtils";
import moment, { Moment } from "moment";
import api from "../api";
import { DevState, ProjectUtils } from "../utils/project";
import type Project from "../utils/project";

const { Option } = Select;

interface P {
	update: boolean;
	setUpdate: () => void;
}

//let editedProject: Project | null = null;

export default function Projects(props: P) {
	useEffect(() => {
		CurrentPageStorage.set("projects");
		getProjects();
		props.setUpdate();
	}, []);
	const [update, setUpdate]: [boolean, any] = useState(false);
	const [newProjectModalVisibility, setNewProjectModalVisibility]: [boolean, any] = useState(false);
	const [tagSelectValue, setTagSelectValue]: [string, any] = useState("");
	const [projects, setProjects]: [Project[], any] = useState([]);
	const [editedProject, setEditedProject]: [Project, any] = useState(ProjectUtils.create(""));
	const [edit, setEdit]: [boolean, any] = useState(false);

	const L = LangUtils.selectLang();

	const onProjectSubmit = (values: any, isEdit: boolean = false) => {
		const url: string = api.url + api.project + (isEdit ? `/${editedProject.id}` : "");
		axios({
			method: isEdit ? "PATCH" : "POST",
			url: url,
			data: values,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setEditedProject(ProjectUtils.create(""));
				setEdit(false);
			});
	};

	const getProjects = () => {
		axios({
			method: "get",
			url: api.url + api.project,
		})
			.then((res) => {
				console.log(res);
				setProjects(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const delProject = (id: number) => {
		axios({
			method: "DELETE",
			url: api.url + api.project + "/" + String(id),
		})
			.then((res) => {
				console.log(res);
				getProjects();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onProjectSubmitFailed = (errorInfo: any) => {};

	return (
		<>
			<ProjectList
				update={update}
				setUpdate={() => {
					setUpdate(!update);
				}}
				projects={projects}
				edit={AdminModeStorage.value === 1}
				onEditClick={(project: Project) => {
					setEditedProject(project);
					setEdit(true);
					setNewProjectModalVisibility(true);
				}}
				onDeleteClick={(project: Project) => {
					delProject(project.id);
				}}
				onPrivateChange={(project: Project, isprivate: boolean) => {
					const url: string = api.url + api.project + "/" + project.id;
					axios({
						method: "PATCH",
						url: url,
						data: { isprivate },
					})
						.then((res) => {
							console.log(res);
						})
						.catch((error) => {
							console.log(error);
						});
				}}
			/>
			<RightContent
				update={update}
				setUpdate={() => {
					setUpdate(!update);
				}}
			>
				<div style={{ marginTop: "20px" }}>
					<ModalForm
						title={edit ? `??????${editedProject?.name}` : "???????????????"}
						visible={newProjectModalVisibility}
						onSubmit={(values) => {
							onProjectSubmit(values, edit);
						}}
						onCancel={() => {
							setEditedProject(ProjectUtils.create(""));
							setEdit(false);
							setNewProjectModalVisibility(false);
						}}
						okButtonTitle="??????"
						cancelButtonTitle="??????"
						items={[
							{ name: "name", label: "????????????", initialValue: edit ? editedProject?.name : "", child: <Input /> },
							{ name: "description", label: "??????", initialValue: edit ? editedProject?.description : "", child: <Input /> },
							{
								name: "technologies",
								label: "???????????????",
								initialValue: edit ? editedProject?.technologies : [],
								child: (
									<Select
										mode="tags"
										style={{ width: "100%" }}
										placeholder="????????????"
										onSearch={(e) => {
											setTagSelectValue(e);
										}}
									>
										{tagSelectValue}
									</Select>
								),
							},
							{ name: "url", label: "URL", initialValue: edit ? editedProject?.url : "", child: <Input /> },
							{ name: "githuburl", label: "Github URL", initialValue: edit ? editedProject?.githuburl : "", child: <Input /> },
							{
								name: "starttime",
								label: "????????????",
								initialValue: edit ? moment(editedProject?.starttime) : moment(),
								child: <DatePicker placeholder={"???????????????"} defaultPickerValue={moment()} />,
							},
							{ name: "version", label: "????????????", initialValue: edit ? editedProject?.version : "", child: <Input /> },
							{
								name: "state",
								label: "????????????",
								initialValue: edit ? editedProject?.state : DevState.Planning,
								child: (
									<Select style={{ width: 120 }}>
										<Option value={DevState.Planning}>{L.utils.devstates.planning}</Option>
										<Option value={DevState.Developping}>{L.utils.devstates.developping}</Option>
										<Option value={DevState.Done}>{L.utils.devstates.done}</Option>
										<Option value={DevState.Dispose}>{L.utils.devstates.dispose}</Option>
									</Select>
								),
							},
							{ name: "headImageUrl", label: "??????URL", initialValue: edit ? editedProject?.headImageUrl : "", child: <Input /> },
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
                  description: 'test, ??????',
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
