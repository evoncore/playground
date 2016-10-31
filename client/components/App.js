import React from 'react';
import Dashboard from './Dashboard';
import { Row, Col } from 'antd';

// Components
import Test from './Test';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" id="app">
        <Dashboard editable={true} rowSelector="ant-row" colSelector="ant-col">
          <Row>
            <Col span={8}>
              <Test>test</Test>
            </Col>
            <Col span={8}>
              <Test>test 2</Test>
            </Col>
            <Col span={8}>
              <Test>test 3</Test>
            </Col>
          </Row>
        </Dashboard>
      </div>
    );
  }

}

export default App;
