import React from 'react';
import { Card } from 'antd';

class Widget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card {...this.props} className="dashboard-widget">
        {this.props.children}
      </Card>
    );
  }

}

export default Widget;