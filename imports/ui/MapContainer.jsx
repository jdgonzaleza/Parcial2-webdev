import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Map from "./Map";
export class MapContainer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <h1>Map with the Bus Stops</h1>
        <small>{this.props.elMensaje}</small>
        <Map google={this.props.google} markers={this.props.markers} />


      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: Meteor.settings.GOOGLE_MAPS_API,
})(MapContainer);