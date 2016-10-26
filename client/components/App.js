import React from 'react';
import Dashboard from 'react-dazzle';

// Connect
import { connect } from 'react-redux';

function mapStateToProps (state) {
  return {
    access: state.access,
  }
}
// End Connect

// Components
import Test from './Test';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widgets: {
        test: {
          type: Test,
          props: { text: 'test' }
        },
        test2: {
          type: Test,
          props: { text: 'test2' }
        },
        test3: {
          type: Test,
          props: { text: 'test3' }
        }
      },
      layout: {
        rows: [{
          columns: [{
            className: 'col-md-4',
            widgets: [{key: 'test'}],
          }, {
            className: 'col-md-4',
            widgets: [{key: 'test2'}],
          }, {
            className: 'col-md-4',
            widgets: [{key: 'test3'}],
          }],
        }],
      }
    };
  }

  dropped(e) {
    var updatedColumns = [];

    e.rows.map(row => {
      row.columns.map(col => {
        updatedColumns.push(col);
      });
    });

    this.setState({
      layout: {
        rows: [{
          columns: updatedColumns
        }]
      }
    });
  }

  render() {
    return (
      <div className="container" id="app">
        <Dashboard editable={true} onMove={this.dropped.bind(this)} widgets={this.state.widgets} layout={this.state.layout} />
      </div>
    );
  }

}

export default connect(mapStateToProps)(App);