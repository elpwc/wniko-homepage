export const Divider = ({ style = {} }) => {
  return (
    <div
      style={{
        height: '1px',
        width: '100%',
        backgroundColor: '#a4a4a4',
        margin: '15px 0',
        ...style, // 可以传入额外的样式
      }}
    />
  );
};
