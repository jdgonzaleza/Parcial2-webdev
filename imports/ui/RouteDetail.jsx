
import React from "react";
import Comment from "./Comment";
export default class RoutesDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    console.log(this.props.detail);
  }

  componentDidUpdate() {

    console.log(this.props);
    return (
      <div>
        <div>
          {this.props.detail.title}
        </div>
        <div>
          {this.props.detail.tag}
        </div>
      </div>

    );
  }
  addComment(e) {
    e.preventDefault();
    let text = document.getElementById("comment").value;
    if(text.trim() === "") {
      console.log("escriba algo");
    } else {
      let item = {
        message: text.trim(),
        name: Meteor.user().username
      };

      let thiscomments = this.props.detail.comment.push(item);
      console.log(thiscomments);
      let elNuevo = {
        tag: this.props.detail.tag,
        title: this.props.detail.title,
        comments: thiscomments
      };
      this.props.addComment(item, elNuevo);
      document.getElementById("comment").value = "";
    }

  }
  render() {

    return (
      <div>
        <h1>Comments</h1>
        <div className="card">
          <h2> <b>Route:</b></h2>
          <h3>{this.props.detail.title + " ( " + this.props.detail.tag + " )"}</h3>
          <div className="card">
            {this.props.detail.comment !== undefined ? (this.props.detail.comment.map((m, i) => <Comment key={i} message={m.message} name={m.name} />)) : ""}
          </div>
          <div className="form-group">
            <label for="comment"><b>Comment:</b></label>
            <textarea type="text" className="form-control" rows="3" cols="3" id="comment"></textarea>
          </div>
          <button onClick={this.addComment.bind(this)}>Add!</button>

        </div>


      </div>

    );
  }
}