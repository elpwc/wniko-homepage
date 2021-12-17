/* Child Function Component */

import { Tooltip } from "antd";
import { UniTagItemP } from "./props_states";

const UniTagItem: React.FC<UniTagItemP> = (props: UniTagItemP) => {
    let style: React.CSSProperties = props.style || {};
    style.borderRadius = props.parentProps?.itemStyle?.borderRadius || props.style?.borderRadius || '3px';
    style.height = props.parentProps?.itemStyle?.height || props.style?.height || 'fit-content';
    style.fontSize = props.parentProps?.itemStyle?.fontSize || props.style?.fontSize || '10px';
    style.width = props.parentProps?.itemStyle?.width || props.style?.width || 'fit-content';
    style.padding = props.parentProps?.itemStyle?.padding || props.style?.padding || '0px 10px';
    style.color = props.parentProps?.itemStyle?.color || props.style?.color || 'white';
    style.backgroundColor = props.parentProps?.itemStyle?.backgroundColor || props.style?.backgroundColor || `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)})`;
    style.margin = props.parentProps?.itemStyle?.margin || props.style?.margin || '2px';
    style.boxShadow = props.parentProps?.itemStyle?.boxShadow || props.style?.boxShadow || '0 0 3px 0px rgb(60, 60, 60)';
    style.cursor = props.parentProps?.itemStyle?.cursor || props.style?.cursor || 'pointer';

    let result: JSX.Element = <div style={style} key={props.keyid} onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
        {props.edit ? <input style={{color: 'black', backgroundColor: style.backgroundColor ,width: 'fit-content', height: '50%', border: 'none'}} defaultValue={typeof props.children === 'string' ? props.children as string : ''} /> : props.children || <></>}
    </div>;

    if (props.url && !props.edit) {
        result = <a target='_blank' rel='noreferrer' href={props.url || '#'}>
            {result}
        </a>;
    }
    if (props.desc) {
        result = <Tooltip title={props.desc}>{result}</Tooltip>;
    }
console.log(props);
    return <>
        <div style={{ display: 'flex' }}>{result}
            {props.edit ?
                <div style={{ height: 'fit-content', width: 'fit-content' }} onClick={() => { props.onDelete?.(props.keyid); }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                </div>
                : <></>}
        </div>

    </>;
};

export default UniTagItem;