import React, {Component} from 'react';

// Message is a functional component that simply generates each message send to it from the MessageList
// Note that notifications and messages are rendered differently
function Message(props) {
  if (props.type === "incomingMessage") {
    let images = null;
    if (props.images.length !== 0){                   // Images, if there are any, are sent in an array
      images = props.images.map( (image, index) => (
            (<div key={index}><br/><img className="message-image" src={image}/></div>)
          ));
    }

    const img = images && images;                     // If there are no images, don't try to render them
    const content = props.content && props.content;   // If there is no content, don't try to render it

    return (
      <div className="message">
        <span className="message-username"
          style={{color: props.userColor}}>{props.user}</span>
        <span className="message-content">{content}
        {img}
        </span>
      </div>
    );
  } else if(props.type === "incomingNotification") {
    return (
      <div className="message system">
        {props.content}
      </div>)
  }
}

export default Message;