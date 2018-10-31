import React, {Component} from 'react';
import Message from './Message.jsx';

// MessageList handles sending each message from the App to be rendered as an actual HTML object
class MessageList extends Component {
  constructor() {
    super();
  }

  render() {
    const messageItems = this.props.messages.map( (message) => (
      <Message
        key={message.id}
        content={message.content}
        user={message.user}
        type={message.type}
        userColor={message.userColor}
        images={message.images} />
    ));
    return (
      <main className="messages">
        {messageItems}
      </main>)
  }
}

export default MessageList;