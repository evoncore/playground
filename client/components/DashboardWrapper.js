import React from 'react';
import Dashboard from 'react-dazzle';

class DashboardWrapper extends React.Component {

  constructor(props) {
    super(props);

    var rows = [];
    var resourceRows = [];

    if (this.props.children.length > 0) {
      this.props.children.map(row => {
        resourceRows.push({
          columns: row.props.children
        });
      });
    } else {
      resourceRows.push({
        columns: this.props.children.props.children
      });
    }

    resourceRows.map(row => {
      var cols = [];

      if (row.columns.length > 0) {
        row.columns.map(col => {
          cols.push({
            className: 'ant-col-' + col.props.span,
            widgets: [{key: 'test'}]
          });
        });
      } else {
        cols.push({
          className: 'ant-col-' + row.columns.props.span,
          widgets: [{key: 'test'}]
        });
      }

      rows.push({ columns: cols });
    });

    this.state = {
      editable: true,
      widgets: {
        test: {
          type: resourceRows[0].columns[0].props.children.type,
          title: 'test'
        }
      },
      layout: {
        rows: rows
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
    var obj = {key: 'test'};
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
      <div>
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

export default DashboardWrapper;