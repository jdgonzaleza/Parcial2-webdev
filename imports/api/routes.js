import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";


export const Routes = new Mongo.Collection("routes");

if(Meteor.isServer) {
  Meteor.publish("routes", function ordersPublication() {
    return Routes.find();
  });
}

Meteor.methods({
  "routes.listApi"() {
    return fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni")
      .then((res) => {
        return res.json();
      }).then((data) => { return data; });
  },
  "routes.insert"(i) {
    Routes.insert({
      title: i.title,
      tag: i.tag,
      comments: []
    });
  },
  "routes.insertComment"(comment, titleT) {
    Routes.update(
      { title: titleT },
      {
        $push: {
          comments: comment
        }
      }

    );
    let res = Routes.find({ title: titleT });
    return res;

  },
  "routes.findByTitle"(titleT) {
    return Routes.find({ title: titleT });
  },

  "routes.routeConfig"(route) {
    return fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni&r=" + route)
      .then((res) => {
        return res.json();
      }).then((data) => { return data; });
  }



});