import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const content = event.target.message.value;
    this.props.addMessage(content);
    event.target.message.value = "";
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
      </form>
      </footer>);
  }
}

export default ChatBar;