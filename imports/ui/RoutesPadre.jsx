import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Routes } from "../api/routes";
import { Meteor } from "meteor/meteor";
import RoutesList from "./RoutesList";
import RouteDetail from "./RouteDetail";
import MapContainer from "./MapContainer";

class RoutesPadre extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: {},
      stops: []
    };
  }
  componentDidMount() {
    // Meteor.call("routes.listApi", (err, result) => {
    //   if(err) throw err;
    //   console.log(result.route);
    //   for(let r of result.route) {
    //     console.log(r);
    //     Meteor.call("routes.insert", r);
    //   }
    // });
  }
  onClick(elQueEs) {

    Meteor.call("routes.routeConfig", elQueEs.tag, (err, rest) => {
      if(err) throw err;
      console.log(rest.route.stop);
      this.setState({
        stops: rest.route.stop
      });
    });
    this.setState({
      clicked: elQueEs
    });
    console.log(this.state.clicked, "entre1");



  }
  addComment(theMessage, elNuevo) {
    console.log(theMessage);
    console.log(elNuevo);
    console.log(this.state.clicked.title);
    Meteor.call("routes.insertComment", theMessage, this.state.clicked.title, (err, rest) => {
      if(err) throw err;
      this.setState({
        clicked: rest
      });
    });


  }

  render() {
    console.log(Meteor.user());
    return (
      <div>

        <div className="row elRowchevere">
          <div className="col-md-6 laLista">
            <RoutesList list={this.props.routesList} click={this.onClick.bind(this)} />
          </div>
          {this.state.clicked.isEmpty ? "" :
            <div className="col-md-6 elDetail">
              <RouteDetail detail={this.state.clicked} stops={this.state.stops}
                addComment={this.addComment.bind(this)} />
            </div>
          }
        </div>
        <div className="elMapa">
          <MapContainer elMensaje={"hola"} markers={this.state.stops} />
        </div>

      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("routes");
  return {
    routesList: Routes.find({}, { sort: { title: 1 } }).fetch()
  };
})(RoutesPadre);