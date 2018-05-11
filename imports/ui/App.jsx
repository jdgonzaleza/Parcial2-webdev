import React from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";
import Graph from "./Graph";
import AccountsUIWrapper from "./AcountsUIWrapper";
import RoutesPadre from "./RoutesPadre";

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
    }, 10000);
  }
  render() {
    return (
      <div>
        <AccountsUIWrapper />
        <div className="elPeque">
          <h1>San Fransico Buses Distance</h1>
          <h4>In order to comment and share your experience in the bus system you need to login.</h4>
          <small className="elPeque">Juan Diego González</small>
        </div>
        <div className="elGrafico">
          <Graph data={this.state.data} />

        </div>

        <div className="elpadre">
          <RoutesPadre />
        </div>
      </div>

    );
  }
}