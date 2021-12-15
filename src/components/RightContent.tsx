interface P {
  children: JSX.Element;
  update: boolean;
  setUpdate: () => void;
  width?: number;
  marginLeft?: number;
}

export default function RightContent(props: P) {
  let width: number = 100,
    marginLeft: number = 10;
  if (props.width) {
    width = props.width;
  }
  if (props.marginLeft) {
    marginLeft = props.marginLeft;
  }
  return (
    <>
      <div style={{ position: 'absolute', right: `-${width + marginLeft}px`, width: `${width}px`, top: '0px' }}>{props.children}</div>
    </>
  );
}
