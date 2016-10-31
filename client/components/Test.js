import React from 'react';

class Test extends React.Component {

  render() {
    return <p className="title">{this.props.children}</p>;
  }

}

export default Test;