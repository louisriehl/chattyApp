import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("Submit!");
  }

  render() {
    return (
      <footer className="chatbar">
      <form onSubmit={this.onSubmit}>
        <input className="chatbar-username"
          placeholder={this.props.currentUser.name} />
      </form>
      <form onSubmit={this.onSubmit}>
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="message" />
        <input type="submit" style={{display: "none"}}/>
      </form>
      </footer>);
  }
}

export default ChatBar;