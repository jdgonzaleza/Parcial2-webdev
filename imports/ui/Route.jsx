import React from "react";
export default class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: "",
      title: ""

    };
  }
  componentDidMount() {
    this.setState({
      tag: this.props.tag,
      title: this.props.title,
      comment: this.props.list
    });
  }
  handleClick() {
    console.log(this.props);
    let item = {
      tag: this.props.tag,
      title: this.props.title,
      comment: this.props.list,
      key: this.props.indice
    };
    console.log(item);
    this.props.clickMe(item);
  }
  render() {
    return (
      <div>
        <a href="#" onClick={this.handleClick.bind(this)}>{this.props.title + " ( " + this.props.tag + " )"}</a>
      </div>
    );
  }
}