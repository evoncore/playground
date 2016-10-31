import React from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rowSelector: this.props.rowSelector || '',
      colSelector: this.props.colSelector || '',
      nativeColumns: null,
      columns: null,
      dragged: null
    };
  }

  componentWillMount() {
    var nativeCols = [];
    var cols = [];

    // columns
    if (this.props.children && this.props.children.length > 0) {

      this.props.children.map(row => {
        row.props.children.map(col => {
          nativeCols.push(col);
          cols.push(col.props.children);
        });
      });

      this.setState({ nativeColumns: nativeCols, columns: cols });
    } else if (this.props.children) {

      if (this.props.children.props.children && this.props.children.props.children.length > 0) {

        this.props.children.props.children.map(col => {
          nativeCols.push(col);
          cols.push(col.props.children);
        });

        this.setState({ nativeColumns: nativeCols, columns: cols });
      } else if (this.props.children.props.children) {

      }
    }
  }

  dragBegin(e) {
    if (this.props.editable) {
      this.setState({ dragged: e.target.closest('.draggable') });
    }
  }

  dragEnd(e) {
    if (this.props.editable) {

      this.state.nativeColumns.map(col => {
        if (e.target.closest('.' + this.state.colSelector + '-' + col.props.span)) {
          e.target.closest('.' + this.state.colSelector + '-' + col.props.span).appendChild(this.state.dragged);
        }
      });

      this.setState({ dragged: null });
    }
  }

  onRemove(e) {
    if (this.props.editable && e.target.nextSibling && e.target.classList.contains('dashboard-remove-btn')) {
      // e.target.parentNode.parentNode.removeChild(e.target.closest('.draggable'));
      e.target.closest('.draggable').style.display = 'none';
    }
  }

  renderItems() {
    return this.state.columns.map((col, val) => {
      if (col.length > 0) {
        return (
          <Droppable key={val}>
            <div onDrag={this.dragBegin.bind(this)}
                 onDrop={this.dragEnd.bind(this)}
                 key={val}
                 style={{padding: '20px 0'}}
                 className={this.state.colSelector + '-'
                 + this.state.nativeColumns[val].props.span
                 + (this.state.nativeColumns[val].props.className ? ' '
                 + this.state.nativeColumns[val].props.className : '')}>
              {
                col.map((child, childVal) => {
                  return (
                    <Draggable enabled={this.props.editable} className="draggable" key={childVal}>
                      {this.props.editable ? <button className="dashboard-remove-btn" onClick={this.onRemove.bind(this)}>remove</button> : ''}
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
                 style={{padding: '20px 0'}}
                 className={this.state.colSelector + '-'
                 + this.state.nativeColumns[val].props.span
                 + (this.state.nativeColumns[val].props.className ? ' '
                 + this.state.nativeColumns[val].props.className : '')}>
              <Draggable enabled={this.props.editable} className="draggable" key={val}>
                {this.props.editable ? <button className="dashboard-remove-btn" onClick={this.onRemove.bind(this)}>remove</button> : ''}
                {col}
              </Draggable>
            </div>
          </Droppable>
        );
      }
    })
  }

  render() {
    return (
      <div className={this.state.rowSelector} ref="dashboard">
        {this.renderItems.call(this)}
      </div>
    );
  }

}

export default Dashboard;