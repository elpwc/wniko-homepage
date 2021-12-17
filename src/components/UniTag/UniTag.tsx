import { Space, Tooltip } from "antd";
import React, { MouseEventHandler } from "react";
import { UniTagItemP, UniTagP, UniTagS } from "./props_states";
import TagObj from "./TagObj";
import UniTagItem from "./UniTagItem";

let deletedTagKeys: string[] = [];
let itemObjs: TagObj[] = [];

class UniTag extends React.Component<UniTagP, UniTagS>{
    constructor(props: UniTagP) {
        super(props);
        this.state = ({
            value: props.value || [],
            edit: props.edit || false,
            style: props.style,
            itemStyle: props.itemStyle,
            onChange: props.onChange,
            onAdd: props.onAdd
        });
    }

    static getDerivedStateFromProps(nextProps: UniTagP, prevState: UniTagS) {
        if (nextProps !== prevState) {
            return nextProps;
        }
        return null;
    }

    componentDidMount() {
        deletedTagKeys = [];
        itemObjs = [];
        itemObjs = [...this.state.value];
        itemObjs = [...React.Children.map(this.props.children as JSX.Element | readonly JSX.Element[], (child: JSX.Element) => {
            if (deletedTagKeys.indexOf((child.props as UniTagItemP).keyid) === -1) {
                return this.getTagObj(child);
            }
        })];
    }

    public static Item = UniTagItem;

    getItemElement = (tag: TagObj) => {
        return <UniTag.Item keyid={tag.keyid} desc={tag.desc} url={tag.url} style={this.state.itemStyle}>{tag.title}</UniTag.Item>
    }

    getTagObj = (tagElement: JSX.Element) => {
        const tagProps: UniTagItemP = tagElement.props;
        return {
            keyid: tagProps.keyid,
            title: tagProps.children,
            desc: tagProps.desc,
            url: tagProps.url,
        } as TagObj;
    }

    itemOnDelete = (key: string) => {
        deletedTagKeys.push(key);
        console.log(key);
        this.props.onChange?.(itemObjs);
        this.forceUpdate();
    };

    addItem = () => {
        const old_value: TagObj[] =[...this.state.value];
        old_value.push({
            keyid: 'new',
            title: ' ',
            desc: undefined,
            url: undefined,
        } as TagObj);
        this.setState({
            value: old_value
        })
    };

    render() {
        return (<>
            <div style={{ display: 'flex' }}>
                {//tags from children
                    React.Children.map(this.props.children as JSX.Element | readonly JSX.Element[], (child: JSX.Element) => {
                        if (deletedTagKeys.indexOf((child.props as UniTagItemP).keyid) === -1) {
                            const childProps: UniTagItemP = {
                                ...child.props,
                                parentProps: this.state,
                                onDelete: (key) => { this.itemOnDelete(key) },
                                edit: this.state.edit,
                            };
                            return React.cloneElement(child, childProps);
                        }

                    })}
                {// tags from props.value
                    this.state.value.map((tag: TagObj) => {
                        return this.getItemElement(tag);
                    })}
                {
                    // add button
                    this.state.edit ? <UniTag.Item keyid='_______add_______' onClick={this.addItem} style={{ ...this.state.itemStyle, color: 'black', backgroundColor: 'white', padding: '0px 0px', borderRadius: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg>
                    </UniTag.Item> : <></>
                }
            </div>
        </>);
    }

}

export default UniTag;