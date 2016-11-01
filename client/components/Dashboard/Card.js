import React from 'react';
import { Card } from 'antd';

class _Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card title={this.props.title} className="dashboard-card">
        {this.props.children}
      </Card>
    );
  }

}

export default _Card;