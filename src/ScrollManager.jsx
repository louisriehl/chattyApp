import React, {Component} from 'react';

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
    return (
      <div ref={thisDiv => { this.thisDiv = thisDiv; }} />
    );
  }
}

export default ScrollManager;