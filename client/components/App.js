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
    var container = this.editableColumns.length > 0 ? this.editableColumns[0].closest('.row').clientWidth : undefined;
    var colClasses =[
      'col-md-1', 'col-md-2', 'col-md-3',
      'col-md-4', 'col-md-5', 'col-md-6',
      'col-md-7', 'col-md-8', 'col-md-9',
      'col-md-10', 'col-md-11', 'col-md-12',
    ];

    var hasClass =(el, cls) => {
      return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    };

    var colSize = (size) => {
      var s = 8.33333333333 * size;
      return Number((container * s / 100).toFixed(2))
    };

    this.editableColumns.forEach(col => {
      col.style.resize = 'both';
      col.style.overflow = 'auto';
      col.style.minWidth = '1px';

      var colvalue = colClasses.length;
      var colsize;
      var drag = {
        begin: null,
        end: null,
        count: null
      };

      col.addEventListener('mouseup', (e) => {
        var that = e.target.closest('.editable-column');
        drag.end = that.clientWidth;

        colsize = colClasses.map(el => {
          if (hasClass(that, el)) return el;
        });

        for (let k in colsize) {
          if (colsize[k]) colsize = Number(k) + 1;
        }

        drag.count = colsize;

        that.style.width = '';
        that.classList.remove('col-md-' + drag.count);

        for (let i = 0; i < colvalue; i++) {
          if (drag.end >= colSize(i - 1) && drag.end <= colSize(i + 1) && drag.count < colvalue) {
            if (drag.end >= colSize(i - 1) && drag.end >= colSize(i))
              drag.count = (i + 1);
            else
              drag.count = i;
          } else if (drag.end > drag.begin && drag.end >= container) {
            drag.count = colsize + (colvalue - colsize);
          } else if (drag.end > drag.begin && drag.count > 10 && drag.count < colvalue) {
            drag.count++;
          }
        }

        if (drag.count === colvalue) {
          for (let i = 0; i < colvalue; i++) {
            if (drag.end < drag.begin && drag.end <= colSize(i)) {
              drag.count = i;
              break;
            }
          }
        } else if (drag.end < drag.begin && drag.count > 0) {
          drag.count--;
        }

        that.classList.add('col-md-' + drag.count);
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