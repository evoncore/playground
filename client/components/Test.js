import React from 'react';

class Test extends React.Component {

  render() {
    return <span>{this.props.children}</span>;
  }

}

export default Test;