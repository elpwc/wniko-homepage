import React from "react";

interface P {
  name: string;
  url: string;
  githubUrl: string;
}

export default class ProjectList extends React.Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <>
        <p>{this.props.name}</p>
        <p>{this.props.url}</p>
        <p>{this.props.githubUrl}</p>
      </>
    );
  }
}
