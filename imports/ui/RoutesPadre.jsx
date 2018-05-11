import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Routes } from "../api/routes";
import Meteor from "meteor/meteor";
import RoutesList from "./RoutesList";
import RouteDetail from "./RouteDetail";
class RoutesPadre extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <RoutesList list={this.props.routesList} />
          </div>
        </div>
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("routes");
  return {
    routesList: Routes.find({}).fetch()
  };
})(RoutesPadre);