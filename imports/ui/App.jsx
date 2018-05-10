import React from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";
import Graph from "./Graph";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.margin = { top: 20, right: 50, bottom: 30, left: 40 };
  }
  componentDidMount() {
    Meteor.setInterval(() => {
      Meteor.call("buses.getLocation", (err, result) => {
        if(err) throw err;
        console.log(result);
        this.setState({ data: result });
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        <h1>Hola Mundo</h1>
        <small>Juan Diego González</small>
        <Graph data={this.state.data} />
      </div>
    );
  }
}