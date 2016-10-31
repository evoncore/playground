import React from 'react';
import Dashboard from 'react-dazzle';

class DashboardWrapper extends React.Component {

  constructor(props) {
    super(props);

    var resourceRows = [];

    var rows = [];
    var widgets = {};

    if (this.props.children && this.props.children.length > 0) {
      this.props.children.map(row => {
        resourceRows.push({
          columns: row.props.children
        });
      });
    } else if (this.props.children) {
      resourceRows.push({
        columns: this.props.children.props.children
      });
    }

    resourceRows.map(row => {
      var cols = [];

      if (row.columns && row.columns.length > 0) {
        row.columns.map(col => {
          if (col.props.children && col.props.children.length > 0) {
            var localWidgets = [];

            col.props.children.map(widget => {
              var title = widget.type.name;

              widgets[title + ''] = {
                type: widget.type,
              };

              localWidgets.push({ key: widget.type.displayName });
            });

            cols.push({
              className: 'ant-col-' + (col.props.span || 24) + (col.props.className ? ' ' + col.props.className : ''),
              widgets: localWidgets
            });
          } else if (col.props.children) {
            var title = col.props.children.type.name;

            widgets[title + ''] = {
              type: col.props.children.type,
            };

            cols.push({
              className: 'ant-col-' + (col.props.span || 24) + (col.props.className ? ' ' + col.props.className : ''),
              widgets: [{key: title}]
            });
          }
        });
      }  else if (row.columns) {
        var title = row.columns.props.children.type.name;

        widgets[title + ''] = {
          type: row.columns.props.children.type,
        };

        cols.push({
          className: 'ant-col-' + (row.columns.props.span || 24) + (row.columns.props.className ? ' ' + row.props.className : ''),
          widgets: [{key: title}]
        });
      }

      rows.push({ columns: cols });
    });

    if (widgets && rows) {
      this.state = {
        editable: true,
        widgets: widgets,
        layout: {
          rows: rows
        }
      };
    }
  }

  updateState(layout) {
    this.setState({ layout: layout });
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
    var obj = {key: 'Test'};
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
        <Dashboard rowClass="ant-row"
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