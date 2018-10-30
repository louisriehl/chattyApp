import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    console.log(this.props);
    event.preventDefault();
    const content = event.target.message.value;
    this.props.addMessage(content);
    event.target.message.value = "";
  }

  onChange(event) {
    console.log(event.target.value);
    this.props.updateCurrentUser(event.target.value);
  }

  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username"
          placeholder={this.props.currentUser.name || "Anonymous"}
          name="user" onChange={this.onChange}/>
      <form onSubmit={this.onSubmit} className="message-form">
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="message" />
      </form>
      </footer>);
  }
}

export default ChatBar;