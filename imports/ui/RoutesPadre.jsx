import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Routes } from "../api/routes";
import RoutesList from "./RoutesList";
import RouteDetail from "./RouteDetail";
class RoutesPadre extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: {}
    };
  }
  componentDidMount() {
    Meteor.call("routes.listApi", (err, result) => {
      if(err) throw err;
      console.log(result.route);
      for(let r of result.route) {
        console.log(r);
        Meteor.call("routes.insert", r);
      }
    });
  }
  onClick(elQueEs) {
    this.setState({
      clicked: elQueEs
    });
    console.log(this.state.clicked, "entre1");

  }
  addComment(theMessage) {
    console.log(theMessage);
    console.log(this.state.clicked.title);
    Meteor.call("routes.insertComment", theMessage, this.state.clicked.title);
  }

  render() {
    console.log(Meteor.user());
    return (
      <div>
        {Meteor.user() === null ? "" : (
          <div className="row">
            <div className="col-md-6 laLista">
              <RoutesList list={this.props.routesList} click={this.onClick.bind(this)} />
            </div>
            {this.state.clicked.isEmpty ? "" :
              <div className="col-md-6 elDetail">

                <RouteDetail detail={this.state.clicked} addComment={this.addComment.bind(this)} />

              </div>
            }
          </div>
        )}

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