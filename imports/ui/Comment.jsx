import React from "react";


export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }
  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <label htmlFor=""><b>{this.props.name}: </b></label>
        <label htmlFor="">{this.props.message}</label>
        <hr />
      </div>
    );
  }
}