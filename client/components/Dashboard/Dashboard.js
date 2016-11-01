import React from 'react';
import 'antd/lib/layout/style/css';
import { Button } from 'antd';
import { Draggable, Droppable } from 'react-drag-and-drop';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    if (props.autoColumns) {
      this.state = {
        rowClass: 'ant-row',
        colClass: 'ant-col',
        nativeColumns: null,
        columns: null,
        dragged: null,
        spanSize: this.props.spanSize,
        columnsLength: 0,
        error: false,
        columnsProps: null
      };
    } else if (props.autoColumns === false) {
      this.state = {
        rowClass: 'ant-row',
        colClass: 'ant-col',
        nativeColumns: null,
        columns: null,
        dragged: null,
        span: 24,
        columnsLength: 0,
        error: false
      };
    } else {
      console.error('Dashboard:', '"autoColumns" prop is required!');
    }
  }

  componentWillMount() {
    var nativeCols = [];
    var cols = [];

    if (this.props.autoColumns) {
      var columnsProps = [];

      if (this.props.children && this.props.children.length > 0) {
        cols = this.props.children;
        nativeCols = this.props.children;
        this.props.children.map(col => {
          columnsProps.push(col.props);
        });
      } else if (this.props.children) {
        cols.push(this.props.children);
        nativeCols.push(this.props.children);
        columnsProps.push(this.props.children.props);
      }

      this.setState({ nativeColumns: nativeCols, columns: cols, columnsProps: columnsProps });
    } else if (!this.props.autoColumns) {
      var error;

      if (this.props.children && this.props.children.length > 0) {
        this.props.children.map(row => {
          if (row.length > 0) {
            row.props.children.map(col => {
              nativeCols.push(col);
              cols.push(col.props.children);
            });
          } else {
            error = true;
          }
        });

        if (error) {
          this.setState({ error: true });
          console.error('Dashboard:', '"autoColumns" prop is false. Use the Row for dashboard layout');
        } else {
          this.setState({nativeColumns: nativeCols, columns: cols});
        }
      } else if (this.props.children) {

        if (this.props.children.props.children && this.props.children.props.children.length > 0) {

          this.props.children.props.children.map(col => {
            nativeCols.push(col);
            cols.push(col.props.children);
          });

          this.setState({nativeColumns: nativeCols, columns: cols});
        } else if (this.props.children) {
          this.setState({nativeColumns: [this.props.children], columns: [this.props.children]});
        }
      }
    }
  }

  componentDidMount() {
    if (!this.props.autoColumns && !this.state.error) {
      this.setState({columnsLength: this.state.nativeColumns.length});
    }
  }

  setSpanSize(value) {
    this.setState({ spanSize: value });
  }

  dragBegin(e) {
    if (this.props.autoColumns && this.props.editable) {
      this.setState({ dragged: e.target.closest('.draggable'), draggedParent: e.target.closest('.draggable').closest('.' + this.state.colClass + '-' + this.state.spanSize)});
    } else if (!this.props.autoColumns) {
      this.setState({ dragged: e.target.closest('.draggable') });
    }
  }

  dragEnd(e) {
    if (this.props.editable) {

      this.state.nativeColumns.map(col => {
        if (this.props.autoColumns && e.target.closest('.' + this.state.colClass + '-' + this.state.spanSize)) {
          e.target.closest('.' + this.state.colClass + '-' + this.state.spanSize).children[0].appendChild(this.state.dragged);
        } else if (!this.props.autoColumns && e.target.closest('.' + this.state.colClass + '-' + (col.props.span || 24))) {
          e.target.closest('.' + this.state.colClass + '-' + (col.props.span || 24)).appendChild(this.state.dragged);
        }
      });

      this.setState({ dragged: null });
    }
  }

  onRemove(e) {
    if (this.props.editable && e.target.classList.contains('dashboard-card-remove-btn')) {
      e.target.closest('.draggable').style.display = 'none';

      this.setState({ columnsLength: this.state.columnsLength - 1 });
    }
  }

  renderColumns() {
    if (!this.props.autoColumns && !this.state.error) {
      return this.state.columns.map((col, val) => {
        if (col && col.children && col.length > 0) {
          return (
            <Droppable key={val}>
              <div onDrag={this.dragBegin.bind(this)}
                   onDrop={this.dragEnd.bind(this)}
                   key={val}
                   className={this.state.colClass + '-'
                   + (this.state.nativeColumns[val].props.span || 24)
                   + (this.state.nativeColumns[val].props.className ? ' '
                   + this.state.nativeColumns[val].props.className : '')}>
                {
                  col.map((child, childVal) => {
                    return (
                      <Draggable className="draggable" key={childVal}>
                        {this.state.editable ? <Button onClick={this.onRemove.bind(this)}></Button> : ''}
                        {child}
                      </Draggable>
                    );
                  })
                }
              </div>
            </Droppable>
          );
        } else if (col) {
          return (
            <Droppable key={val}>
              <div onDrag={this.dragBegin.bind(this)}
                   onDrop={this.dragEnd.bind(this)}
                   key={val}
                   className={this.state.colClass + '-'
                   + (this.state.nativeColumns[val].props.span || 24)
                   + (this.state.nativeColumns[val].props.className ? ' '
                   + this.state.nativeColumns[val].props.className : '')}>
                <Draggable enabled={this.props.editable} className="draggable" key={val}>
                  {this.props.editable ?
                    <Button className="dashboard-card-remove-btn" onClick={this.onRemove.bind(this)}></Button> : ''}
                  {col}
                </Draggable>
              </div>
            </Droppable>
          );
        }
      });
    }
  }

  renderAutoColumns() {
    var items = [];
    var colsSize = (24 / this.state.spanSize);

    var cols = this.state.columns.map((col, val) => {
      return (
        <Draggable onDrag={this.dragBegin.bind(this)}
                   enabled={this.props.editable}
                   className="draggable"
                   key={val}>
          {col}
          <div className="dashboard-card-controls">
            {this.props.editable ?
              <Button className="dashboard-card-remove-btn" onClick={this.onRemove.bind(this)}></Button> : ''}
          </div>
        </Draggable>
      );
    });

    var colsLength = cols.length;

    for (let i = 0; i < colsSize; i++) {
      items.push(
        <Droppable className={this.state.colClass + '-' + this.state.spanSize} key={i}>
          <div onDrop={this.dragEnd.bind(this)}> {/* cant onDrop bind with <Droppable> and need one more div */}
            {cols.splice(0, colsLength / colsSize)}
          </div>
        </Droppable>
      );
    }

    return items;
  }

  render() {
    return (
      <div className={"dashboard " + (this.props.editable ? 'edit' : '') + ' ' + this.state.rowClass} ref="dashboard">
        {this.props.editable ?
          <div>
            <Button onClick={this.setSpanSize.bind(this, 24)}>1</Button>
            <Button onClick={this.setSpanSize.bind(this, 12)}>2</Button>
            <Button onClick={this.setSpanSize.bind(this, 8)}>3</Button>
          </div>
          : ''}
        {this.props.autoColumns ? this.renderAutoColumns.call(this) : this.renderColumns.call(this)}
      </div>
    );
  }

}

export default Dashboard;