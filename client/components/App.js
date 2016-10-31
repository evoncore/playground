import React from 'react';
import Dashboard from 'react-dazzle';
import { Row, Col } from 'antd';

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
            className: 'ant-col-8',
            widgets: [{key: 'test'}],
          }, {
            className: 'ant-col-8',
            widgets: [{key: 'test2'}],
          }, {
            className: 'ant-col-8',
            widgets: [{key: 'test3'}],
          }, {
            className: 'ant-col-8',
            widgets: [{key: 'test'}],
          }, {
            className: 'ant-col-8',
            widgets: [{key: 'test2'}],
          }, {
            className: 'ant-col-8',
            widgets: [{key: 'test3'}],
          }],
        }],
      }
    };
  }

  updateState(layout) {
    var updatedColumns = [];

    layout.rows.map(row => {
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

  drag(layout) {
    this.updateState(layout);
  }

  remove(layout) {
    this.updateState(layout);
  }

  edit() {
    if (this.state.editable)
      this.setState({ editable: false });
    else
      this.setState({ editable: true });
  }

  add(layout, row, col) {
    var obj = {key: 'test3'};
    var rows = this.state.layout.rows;
    var target = rows[row].columns[col];

    target.widgets.push(obj);

    this.updateState(layout);
  }

  changeGrid(value) {
    var colClass;

    switch (value) {
      case 1: {
        colClass = 'ant-col-24';
        break;
      }

      case 2: {
        colClass = 'ant-col-12';
        break;
      }

      case 3: {
        colClass = 'ant-col-8';
        break;
      }
    }

    this.state.layout.rows.map(row => {
      row.columns.map(col => {
        col.className = colClass;
      });
    });

    this.setState(this.state.layout);
  }

  render() {
    return (
      <div className="container" id="app">
        <button onClick={this.edit.bind(this)}>edit</button>
        {
          this.state.editable ? (
          <span>
            <button onClick={this.changeGrid.bind(this, 1)}>1</button>
            <button onClick={this.changeGrid.bind(this, 2)}>2</button>
            <button onClick={this.changeGrid.bind(this, 3)}>3</button>
          </span>
          ) : ''
        }
        <br/>
        <Dashboard ref="dashboard"
                   rowClass="ant-row"
                   editable={this.state.editable}
                   onMove={this.drag.bind(this)}
                   onRemove={this.remove.bind(this)}
                   onAdd={this.add.bind(this)}
                   widgets={this.state.widgets}
                   layout={this.state.layout} />
      </div>
    );
  }

}

export default App;
