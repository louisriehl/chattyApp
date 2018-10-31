import React, {Component} from 'react';

// As would be expected of most modern chats, ours should also autoscroll when a new message is posted
// Whenever something changed in App.jsx, ScollManager tells the browser to scroll to its position at the bottom
class ScrollManager extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.thisDiv.scrollIntoView({behavior: "smooth"});
  }

  render() {
  // The manager sets a reference to itself to know where to scroll
    return (
      <div ref={thisDiv => { this.thisDiv = thisDiv; }} />
    );
  }
}

export default ScrollManager;