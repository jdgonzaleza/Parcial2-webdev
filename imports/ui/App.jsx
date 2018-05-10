import React from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      busesNested: []
    };
  }
  componentDidMount() {
    Meteor.call("buses.getLocation", (err, result) => {
      if(err) throw err;
      var buses = result.vehicle;
      var nestedBuses = d3.nest().key((d) => d.routeTag).entries(buses);
      this.setState({
        busesNested: nestedBuses
      });
      var getDistance = function(lat1, lon1, lat2, lon2) {
        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
      };

    });

  }

  render() {

    return (
      <div>
        <h1>Hola Mundo</h1>
        <small>Juan Diego González</small>
      </div>
    );
  }
}
