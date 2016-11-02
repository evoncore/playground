import React from 'react';
import { Dashboard, Widget } from './Dashboard';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" id="app">

        <Dashboard numberOfColumns={3}>
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
