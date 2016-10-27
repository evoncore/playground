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
          }, {
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

  componentDidMount() {
    this.editableColumns = document.querySelectorAll('.editable-column');
    var container = this.editableColumns[0].closest('.row').clientWidth;

    var colSize = (size) => {
      var s = 8.33333333333 * size;
      return Number((container * s / 100).toFixed(2))
    };

    this.editableColumns.forEach(col => {
      col.style.resize = 'both';
      col.style.overflow = 'auto';
      col.style.minWidth = '1px';
      var count = 4;
      var drag = {
        begin: null,
        end: null,
      };

      col.addEventListener('mouseup', (e) => {
        var that = e.target.closest('.editable-column');
        drag.end = that.clientWidth;

        that.style.width = '';
        that.classList.remove('col-md-' + count);

        for (let i = 0; i < 12; i++) {
          if (drag.end > colSize(i - 1) && drag.end < colSize(i + 1) && count < 12) {
            count = i;
          } else if (drag.end > drag.begin && drag.end >= container) {
            count = 12;
          } else if (drag.end > drag.begin && count > 10 && count < 12) {
            count++;
          }
        }

        if (drag.end < drag.begin && count > 0) {
          count--;
        }

        that.classList.add('col-md-' + count);
      });

      col.addEventListener('mousedown', (e) => {
        var that = e.target.closest('.editable-column');
        drag.begin = that.clientWidth;
      });

    });
  }

  render() {
    return (
      <div className="container" id="app">
        <button onClick={this.edit.bind(this)}>edit</button>
        <br/>
        <Dashboard ref="dashboard"
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

export default connect(mapStateToProps)(App);