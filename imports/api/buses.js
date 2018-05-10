import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
import fetch from "node-fetch";

Meteor.methods({
  "buses.getLocation"() {
    return fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=1144953500233")
      .then((res) => {
        return res.json();
      }).then((data) => { return data; });
  }
});