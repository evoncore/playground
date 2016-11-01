import React from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    if (props.autoColumns) {
      this.state = {
        nativeColumns: null,
        columns: null,
        dragged: null,
        spanSize: this.props.spanSize,
        columnsLength: 0
      };
    } else {
      this.state = {
        nativeColumns: null,
        columns: null,
        dragged: null,
        span: 24,
        columnsLength: 0,
        draggedParent: null
      };
    }
  }

  componentWillMount() {
    var nativeCols = [];
    var cols = [];

    // columns
    if (this.props.autoColumns) {
      if (this.props.children && this.props.children.length > 0) {
        cols = this.props.children
        nativeCols.push(this.props.children);
      } else if (this.props.children) {
        cols.push(this.props.children);
        nativeCols.push(this.props.children);
      }

      this.setState({ nativeColumns: nativeCols, columns: cols });
    } else if (!this.props.autoColumns) {
      if (this.props.children && this.props.children.length > 0) {
        this.props.children.map(row => {
          row.props.children.map(col => {
            nativeCols.push(col);
            cols.push(col.props.children);
          });
        });

        this.setState({nativeColumns: nativeCols, columns: cols});
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
    if (!this.props.autoColumns) {
      this.setState({columnsLength: this.state.nativeColumns.length});
    }
  }

  setSpanSize(value) {
    switch (value) {
      case 1: {
        this.setState({ spanSize: 24 });
        break;
      }

      case 2: {
        this.setState({ spanSize: 12 });
        break;
      }

      case 3: {
        this.setState({ spanSize: 8 });
        break;
      }
    }
  }

  dragBegin(e) {
    if (this.props.autoColumns && this.props.editable) {
      this.setState({ dragged: e.target.closest('.draggable'), draggedParent: e.target.closest('.draggable').closest('.' + this.props.colSelector + '-' + this.state.spanSize)});
    } else if (!this.props.autoColumns) {
      this.setState({ dragged: e.target.closest('.draggable') });
    }
  }

  dragEnd(e) {
    if (this.props.editable) {

      this.state.nativeColumns.map(col => {
        if (this.props.autoColumns && e.target.closest('.' + this.props.colSelector + '-' + this.state.spanSize)) {
          e.target.closest('.' + this.props.colSelector + '-' + this.state.spanSize).appendChild(this.state.dragged);
        } else if (!this.props.autoColumns && e.target.closest('.' + this.props.colSelector + '-' + (col.props.span || 24))) {
          e.target.closest('.' + this.props.colSelector + '-' + (col.props.span || 24)).appendChild(this.state.dragged);
        }
      });

      this.setState({ dragged: null });
    }

    // remove column from dom if they have no children
    if (this.state.draggedParent && this.state.dragged) {
      this.state.draggedParent.style.display = 'none';
    }
  }

  onRemove(e) {
    if (this.props.editable && e.target.nextSibling && e.target.classList.contains('dashboard-remove-btn')) {
      e.target.closest('.draggable').parentNode.style.display = 'none';

      this.setState({ columnsLength: this.state.columnsLength - 1 });
    }
  }

  renderColumns() {
    if (!this.props.autoColumns) {
      return this.state.columns.map((col, val) => {
        if (col.length > 0) {
          return (
            <Droppable key={val}>
              <div onDrag={this.dragBegin.bind(this)}
                   onDrop={this.dragEnd.bind(this)}
                   key={val}
                   className={this.props.colSelector + '-'
                   + (this.state.nativeColumns[val].props.span || 24)
                   + (this.state.nativeColumns[val].props.className ? ' '
                   + this.state.nativeColumns[val].props.className : '')}>
                {
                  col.map((child, childVal) => {
                    return (
                      <Draggable className="draggable" key={childVal}>
                        {this.state.editable ? <button onClick={this.onRemove.bind(this)}>remove</button> : ''}
                        {child}
                      </Draggable>
                    );
                  })
                }
              </div>
            </Droppable>
          );
        } else if (col) {
          /*+ (this.state.span / this.state.columnsLength)*/
          return (
            <Droppable key={val}>
              <div onDrag={this.dragBegin.bind(this)}
                   onDrop={this.dragEnd.bind(this)}
                   key={val}
                   className={this.props.colSelector + '-'
                   + (this.state.nativeColumns[val].props.span || 24)
                   + (this.state.nativeColumns[val].props.className ? ' '
                   + this.state.nativeColumns[val].props.className : '')}>
                <Draggable enabled={this.props.editable} className="draggable" key={val}>
                  {this.props.editable ?
                    <button className="dashboard-remove-btn" onClick={this.onRemove.bind(this)}>remove</button> : ''}
                  {col}
                </Draggable>
              </div>
            </Droppable>
          );
        }
      })
    }
  }

  renderAutoColumns() {
    return this.state.columns.map((col, val) => {
      return (
        <Droppable key={val}>
          <div onDrag={this.dragBegin.bind(this)}
               onDrop={this.dragEnd.bind(this)}
               key={val}
               className={this.props.colSelector + '-' + this.state.spanSize}>
            <Draggable enabled={this.props.editable} className="draggable" key={val}>
              {this.props.editable ?
                <button className="dashboard-remove-btn" onClick={this.onRemove.bind(this)}>remove</button> : ''}
              {col}
            </Draggable>
          </div>
        </Droppable>
      );
    });
  }

  render() {
    return (
      <div className={this.props.rowSelector} ref="dashboard">
        {this.props.editable ?
          <div>
            <button onClick={this.setSpanSize.bind(this, 1)}>1</button>
            <button onClick={this.setSpanSize.bind(this, 2)}>2</button>
            <button onClick={this.setSpanSize.bind(this, 3)}>3</button>
          </div>
          : ''}
        {this.props.autoColumns ? this.renderAutoColumns.call(this) : this.renderColumns.call(this)}
      </div>
    );
  }

}

export default Dashboard;