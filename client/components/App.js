import React from 'react';
import { Dashboard, Widget } from './Dashboard';
import { Button } from 'antd';

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
        <Button style={{margin: '5px'}} onClick={this.edit.bind(this)}>edit</Button>
        <Dashboard autoColumns={true}
                   spanSize={this.state.spanSize}
                   editable={this.state.editable}>
          <Widget title="title">text 1</Widget>
          <Widget title="title">text 2</Widget>
          <Widget title="title">text 3</Widget>
          <Widget title="title">text 4</Widget>
          <Widget title="title">text 5</Widget>
          <Widget title="title">text 6</Widget>
        </Dashboard>
      </div>
    );
  }

}

export default App;
