import React, {Component} from 'react';

class ScrollManager extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.element.scrollIntoView({behavior: "smooth"});
  }

  render() {
    return (
      <div ref={element => { this.element = element; }} />
    );
  }
}

export default ScrollManager;