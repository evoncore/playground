import React from 'react';
import DashboardWrapper from './DashboardWrapper';

// Components
import Test from './Test';

// Layout
import { row, col } from './DashboardLayout';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" id="app">
        <DashboardWrapper widgets={[Test]}>
          <row>
            <col span={8}>
              <Test />
            </col>
            <col span={8}>
              <Test />
            </col>
            <col span={8}>
              <Test />
            </col>
          </row>
          <row>
            <col span={24}>
              <Test />
            </col>
            <col span={24}>
              <Test />
            </col>
            <col span={24}>
              <Test />
            </col>
          </row>
        </DashboardWrapper>
      </div>
    );
  }

}

export default App;
