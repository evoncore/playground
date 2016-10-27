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
      editable: true,
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
          },{
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

  updateState(e) {
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

  drag(e) {
    this.updateState(e);
  }

  remove(e) {
    this.updateState(e);
  }

  edit() {
    if (this.state.editable)
      this.setState({ editable: false });
    else
      this.setState({ editable: true });
  }

  add(e, row, col) {
    var obj = {key: 'test3'};

    var rows = this.state.layout.rows;

    var target = rows[row].columns[col];
    target.widgets.push(obj);

    this.updateState(e);
  }

  render() {
    return (
      <div className="container" id="app">
        <button onClick={this.edit.bind(this)}>edit</button>
        <br/>
        <Dashboard editable={this.state.editable}
                   onMove={this.drag.bind(this)}
                   onRemove={this.remove.bind(this)}
                   onAdd={this.add.bind(this)}
                   widgets={this.state.widgets}
                   layout={this.state.layout} />
      </div>
    );
  }

}

export default connect(mapStateToProps)(App);