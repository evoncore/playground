import React from 'react';
import Dashboard from './Dashboard';
import { Row, Col } from 'antd';

// Components
import Test from './Test';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false
    }
  }

  edit() {
    if (this.state.editable)
      this.setState({ editable: false });
    else
      this.setState({ editable: true });
  }

  render() {
    return (
      <div className="container" id="app">
        <button onClick={this.edit.bind(this)}>edit</button>
        <Dashboard editable={this.state.editable} rowSelector="ant-row" colSelector="ant-col">
          <Row>
            <Col span={8}>
              <Test>test 1</Test>
              <Test>test 2</Test>
              <Test>test 3</Test>
            </Col>
            <Col span={8}>
              <Test>test 4</Test>
            </Col>
            <Col span={8}>
              <Test>test 5</Test>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Test>test 6</Test>
            </Col>
            <Col span={8}>
              <Test>test 5</Test>
            </Col>
            <Col span={8}>
              <Test>test 6</Test>
              <Test>test 6</Test>
              <Test>test 6</Test>
              <Test>test 6</Test>
              <Test>test 6</Test>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Test>test 7</Test>
              <Test>test 6</Test>
              <Test>test 6</Test>
            </Col>
            <Col span={8}>
              <Test>test 8</Test>
              <Test>test 6</Test>
            </Col>
            <Col span={8}>
              <Test>test 9</Test>
              <Test>test 6</Test>
              <Test>test 6</Test>
            </Col>
          </Row>
        </Dashboard>
      </div>
    );
  }

}

export default App;
