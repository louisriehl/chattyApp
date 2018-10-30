import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor() {
    super();
  }

  render() {

    const messageItems = this.props.messages.map( (message) => (
      <Message key={message.id} type={message.type} content={message.content} username={message.username} />
    )
    );
    return (
      <main className="messages">
        {messageItems}
      </main>)
  }
}

export default MessageList;