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
    return fetch("http://http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni")
      .then((res) => {
        return res.json();
      }).then((data) => { return data; });
  },
  "routes.insert"() {

    var a = fetch("http://http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni")
      .then((res) => {
        return res.json();
      }).then((data) => { return data; });

    for(let i of a) {
      Routes.insert({
        tittle: i.tittle,
        tag: i.tag,
        comments: []
      });
    }
  },
  "routes.insertComment"(comment, tittleT) {
    Routes.update(
      { tittle: tittleT },
      {
        $push: {
          comments: comment
        }
      }
    );

  }


});