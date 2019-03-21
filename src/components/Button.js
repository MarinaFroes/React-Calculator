import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className="button"
        data-value={this.props.value}
      >
        {this.props.label}
      </div>
    )
  }
}

export default Button;