import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor() {
    super();
  }

  render() {
    const messageItems = this.props.messages.map( (message) => (
      <Message key={message.id} content={message.content} user={message.user} type={message.type} userColor={message.userColor} />
    )
    );
    return (
      <main className="messages">
        {messageItems}
      </main>)
  }
}

export default MessageList;