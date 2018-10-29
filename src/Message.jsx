import React, {Component} from 'react';

function Message(props) {
  if (props.type === "incomingMessage") {
    console.log('This is a message!');
    return (
      <div className="message">
        <span className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
    );
  } else if(props.type === "incomingNotification") {
    console.log('This is a notification!');
    return (
      <div className="message system">
        {props.content}
      </div>)
  }
}

export default Message;