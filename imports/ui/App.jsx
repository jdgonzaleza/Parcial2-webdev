import React from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      busesNested: [],
      stackedBuses: []
    };
    this.margin = { top: 20, right: 50, bottom: 30, left: 40 };
  }

  componentDidMount() {
    Meteor.call("buses.getLocation", (err, result) => {
      if(err) throw err;
      var buses = result.vehicle;
      var nestedBuses = d3.nest().key((d) => d.routeTag).entries(buses);
      this.computeDistances(nestedBuses);




      var maxNumBuses = d3.max(nestedBuses.map((d) => d.values.length));
      console.log(maxNumBuses);
      var keys = d3.range(maxNumBuses);
      console.log(keys);
      this.stackedBuses = d3.stack()
        .keys(keys)
        .value((d, key) => {
          return key < d.values.length ? d.values[key].distance : 0;
        })(nestedBuses);
      console.log(this.stackedBuses);

      this.setState({
        busesNested: nestedBuses
      });
      console.log(nestedBuses, "soy nestedBUses");




      const svg = d3.select(this.svg),
        height = svg.attr("height"),
        width = svg.attr("width"),
        margin = { top: 20, right: 50, bottom: 30, left: 40 },
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleBand()
        .rangeRound([0, width - margin.left - margin.right])
        .paddingInner(0.05)
        .align(0.1);

      var y = d3.scaleLinear()
        .rangeRound([height - margin.top - margin.bottom, 0]);

      var z = d3.scaleSequential(d3.interpolateBlues);


      x.domain(nestedBuses.map(function(d) { return d.key; }));
      y.domain([0, d3.max(nestedBuses, function(d) { return d.total; })]).nice();
      z.domain([0, maxNumBuses]);
      g.append("g")
        .selectAll("g")
        .data(this.stackedBuses)
        .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
        .attr("stroke", "white")
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.key); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Added distance");

      var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(-50," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

      return svg.node();

    });





  }
  computeDistances(nestedBuses) {
    for(let route of nestedBuses) {
      route.total = 0;
      route.values[0].distance = 0;
      for(let i = 1; i < route.values.length; i++) {
        route.values[i].distance = this.getDistance(+route.values[i - 1].lat, +route.values[i - 1].lon,
          +route.values[i].lat, +route.values[i].lon);
        route.total += route.values[i].distance;
      }
    }
    return nestedBuses.sort(function(a, b) { return b.total - a.total; });
  }
  getDistance(lat1, lon1, lat2, lon2) {
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

  update(stackedBuses) {
    if(!this.state.busesNested || this.state.busesNested.length === 0) return;

    this.x.domain(this.state.busesNested.map(function(d) { return d.key; }));
    this.y.domain([0, d3.max(this.state.busesNested, function(d) { return d.total; })]).nice();
    this.z.domain([0, this.maxNumBuses]);
    this.g.append("g")
      .selectAll("g")
      .data(stackedBuses)
      .enter().append("g")
      .attr("fill", function(d) { console.log(d); return this.z(d.key); })
      .attr("stroke", "white")
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("x", function(d) { return this.x(d.data.key); })
      .attr("y", function(d) { return this.y(d[1]); })
      .attr("height", function(d) { return this.y(d[0]) - this.y(d[1]); })
      .attr("width", this.x.bandwidth());

    this.g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (this.height - this.margin.top - this.margin.bottom) + ")")
      .call(d3.axisBottom(this.x));

    this.g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(this.y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Added distance");

    var legend = this.g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(this.keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(-50," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", this.width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", this.z);

    legend.append("text")
      .attr("x", this.width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

    return this.svg.node();



  }

  render() {

    return (
      <div>
        <h1>Hola Mundo</h1>
        <small>Juan Diego González</small>
        <div className="elChart">
          <svg
            width="900"
            height="500"
            ref={(svg) => this.svg = svg}></svg>
        </div>
      </div>
    );
  }
}
