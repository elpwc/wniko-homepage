import { UniTagItemP } from './props_states';

const UniTagItem: React.FC<UniTagItemP> = (props: UniTagItemP) => {
  let style: React.CSSProperties = props.parentProps?.itemStyle || props.style || {};
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

  let result: JSX.Element = (
    <div
      style={style}
      key={props.value}
      onClick={e => {
        props.onClick?.(e, props.value);
      }}
      onMouseEnter={e => {
        props.onMouseEnter?.(e, props.value);
      }}
      onMouseLeave={e => {
        props.onMouseLeave?.(e, props.value);
      }}
    >
      {props.children}
    </div>
  );

  return (
    <>
      <div style={{ display: 'flex', paddingLeft: props.parentProps?.gap, paddingRight: props.parentProps?.gap }}>
        {result}
        {props.edit ? (
          <div
            style={{ height: 'fit-content', width: 'fit-content' }}
            onClick={() => {
              props.onDelete?.(props.value);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UniTagItem;
