import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <hr />
        <address>
          <p>Page written by {this.props.author}.</p>
          <p>Contact: {this.props.contact}</p>
          <p>{this.props.message}</p>
        </address>
      </footer>
    )
  }
}

export default Footer;