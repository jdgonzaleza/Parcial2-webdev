import React from "react";
import Route from "./Route";
export default class RoutesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: null
    };

  }


  handleClick(elItem) {
    this.props.click(elItem);
    console.log(elItem, "entra2");
  }
  render() {
    return (
      <div>
        <h1 className="laListicaH1"> Routes Lists in SF</h1>
        <div className="vertical-menu">
          {this.props.list.map((l, i) =>
            <Route key={i} tag={l.tag} title={l.title} list={l.comments} clickMe={this.handleClick.bind(this)} />
          )}
        </div>
      </div>
    );
  }
}