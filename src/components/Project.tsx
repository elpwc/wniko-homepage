interface P {
  name: string;
  url: string;
  githubUrl: string;
}

export default function Project(props: P) {
  return (
    <>
      <p>{props.name}</p>
      <p>{props.url}</p>
      <p>{props.githubUrl}</p>
    </>
  );
}
