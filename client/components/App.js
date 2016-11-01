import React from 'react';
import { Dashboard, Card } from './Dashboard';

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
        <Dashboard autoColumns={true}
                   spanSize={this.state.spanSize}
                   editable={this.state.editable}
                   rowSelector="ant-row"
                   colSelector="ant-col">
          <Card title="title">text 1</Card>
          <Card title="title">text 2</Card>
          <Card title="title">text 3</Card>
          <Card title="title">text 4</Card>
          <Card title="title">text 5</Card>
          <Card title="title">text 6</Card>
        </Dashboard>
      </div>
    );
  }

}

export default App;
