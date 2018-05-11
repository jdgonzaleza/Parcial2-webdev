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
        <h1>Google Api Map</h1>
        <small>{this.props.elMensaje}</small>
        <Map google={this.props.google} markers={this.props.markers} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API,
})(MapContainer);