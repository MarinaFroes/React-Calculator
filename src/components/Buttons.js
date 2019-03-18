import React from 'react';

class Buttons extends React.Component {
  render() {
    return <div className="buttons"> {this.props.children}</div>
  }
}

export default Buttons;