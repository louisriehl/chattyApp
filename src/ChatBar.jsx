import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const content = event.target.message.value;
    this.props.sendMessage(content);
    event.target.message.value = "";
  }

  onBlur(event) {
    console.log(event.target.value);
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
          name="user" onChange={this.onChange} onBlur={this.onBlur}/>
      <form onSubmit={this.onSubmit} className="message-form">
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="message" />
      </form>
      </footer>);
  }
}

export default ChatBar;