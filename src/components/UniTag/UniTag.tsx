import { Space, Tooltip } from 'antd';
import React, { MouseEventHandler } from 'react';
import { UniTagItemP, UniTagP, UniTagS } from './props_states';
import UniTagItem from './UniTagItem';

let deletedTagKeys: string[] = [];

class UniTag extends React.Component<UniTagP, UniTagS> {
  constructor(props: UniTagP) {
    super(props);
    this.state = {
      value: props.value || [],
      items: [],
      edit: props.edit || false,
      editing: false,
      editingTagInputValue: '',
      style: props.style,
      itemStyle: props.itemStyle,
      gap: props.gap,
      onChange: props.onChange,
      onDelete: props.onDelete,
      onAdd: props.onAdd,
      onEditInputhange: props.onEditInputhange,
    };
  }

  static getDerivedStateFromProps(nextProps: UniTagP, prevState: UniTagS) {
    if (nextProps !== prevState) {
      return nextProps;
    }
    return null;
  }

  componentDidMount() {
    const prepareToAdd: JSX.Element[] = [];
    React.Children.forEach(this.props.children as JSX.Element | readonly JSX.Element[], (child: JSX.Element) => {
      if (deletedTagKeys.indexOf((child.props as UniTagItemP).value) === -1) {
        const childProps: UniTagItemP = {
          ...child.props,
          parentProps: this.state,
          onDelete: key => {
            this.itemOnDelete(key);
          },
          edit: this.props.edit,
        };
        prepareToAdd.push(React.cloneElement(child, childProps));
      }
    });
    this.props.value?.forEach((item: string) => {
      if (deletedTagKeys.indexOf(item) === -1) {
        prepareToAdd.push(this.getItemElement(item));
      }
    });
    this.setState({ items: [...prepareToAdd] });
  }

  public static Item = UniTagItem;

  getItemElement = (tag: string) => {
    return (
      <UniTag.Item value={tag} edit={this.state.edit} style={this.state.itemStyle} onDelete={this.itemOnDelete} parentProps={this.state}>
        {tag}
      </UniTag.Item>
    );
  };

  itemOnDelete = (key: string) => {
    const newItems: JSX.Element[] = this.state.items.filter((item: JSX.Element) => {
      return item.props.value !== key;
    });
    const values: string[] = [];
    newItems.forEach((item: JSX.Element) => {
      values.push(item.props.value);
    });
    this.state.onChange?.(values);
    this.setState({ items: newItems });
  };

  addItem = (item: string) => {
    const old_value: JSX.Element[] = [...this.state.items];
    old_value.push(this.getItemElement(item));
    this.state.onAdd?.(item);
    this.setState({
      items: old_value,
    });
  };

  render() {
    return (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.items.map((item: JSX.Element) => {
            return item;
          })}
          {this.state.editing ? (
            <>
              <div style={{ display: 'flow' }}>
                <input
                  style={{ height: '80%', width: '100px' }}
                  value={this.state.editingTagInputValue}
                  onChange={e => {
                    this.state.onEditInputhange?.(e.target.value);
                    this.setState({ editingTagInputValue: e.target.value });
                  }}
                  onBlur={() => {
                    if (this.state.editingTagInputValue) {
                      let exist = false;
                      this.state.items.forEach((item: JSX.Element) => {
                        if (item.props.value === this.state.editingTagInputValue) {
                          exist = true;
                          return;
                        }
                      });
                      if (exist) {
                        this.setState({ editing: false, editingTagInputValue: '' });
                      } else {
                        this.addItem(this.state.editingTagInputValue);
                        this.setState({ editingTagInputValue: '' });
                      }
                    } else {
                      this.setState({ editing: false });
                    }
                  }}
                />
                {this.state.editDropdown ? (
                  <div style={{ backgroundColor: 'white', border: 'solid 1px darkgray', borderRadius: '5px', position: 'absolute', zIndex: '1' }}>{this.state.editDropdown}</div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
          {
            // add button
            this.state.edit ? (
              <UniTag.Item
                value="_______add_______"
                onClick={() => {
                  this.setState({ editing: true });
                }}
                style={{ ...this.state.itemStyle, color: 'black', backgroundColor: 'white', padding: '0px 0px', borderRadius: '10px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
              </UniTag.Item>
            ) : (
              <></>
            )
          }
        </div>
      </>
    );
  }
}

export default UniTag;
