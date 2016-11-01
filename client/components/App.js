import React from 'react';
import Dashboard from './Dashboard';
import { Row } from 'antd';

// Components
import Test from './Test';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      spanSize: 8
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
        <Dashboard autoColumns={false}
                   spanSize={this.state.spanSize}
                   editable={this.state.editable}
                   rowSelector="ant-row"
                   colSelector="ant-col">
          <Row>
            <Test>test 1</Test>
            <Test>test 4</Test>
            <Test>test 5</Test>
            <Test>test 6</Test>
            <Test>test 7</Test>
            <Test>test 8</Test>
            <Test>test 9</Test>
            <Test>test 10</Test>
            <Test>test 11</Test>
          </Row>
        </Dashboard>
      </div>
    );
  }

}

export default App;
