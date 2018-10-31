import React, {Component} from 'react';

function Message(props) {
  console.log('Got message Component');
  if (props.type === "incomingMessage") {
    let images = null;
    console.log(props.images.length);
    if (props.images.length !== 0){
      console.log("An image or more exists in the message!");
      images = props.images.map( (image, index) => (
            (<div key={index}><br/><img src={image}/><br/></div>)
          ));
    }
    const img = images && images;
    const content = props.content && props.content;
    console.log("Content": content);
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