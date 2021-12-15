interface P {
  children: JSX.Element;
  update: boolean;
  setUpdate: () => void;
  width?: number;
  marginRight?: number;
}

export default function LeftContent(props: P) {
  let width: number = 200,
    marginRight: number = 10;
  if (props.width) {
    width = props.width;
  }
  if (props.marginRight) {
    marginRight = props.marginRight;
  }
  return (
    <>
      <div style={{ position: 'absolute', left: `-${width + marginRight}px`, width: `${width}px`, top: '0px' }}>{props.children}</div>
    </>
  );
}
