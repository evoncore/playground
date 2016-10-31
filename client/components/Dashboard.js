import React from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: this.props.editable,
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
    if (this.state.editable) {
      this.setState({ dragged: e.target.closest('.draggable') });
    }
  }

  dragEnd(e) {
    if (this.state.editable) {

      this.state.nativeColumns.map(col => {
        if (e.target.closest('.' + this.state.colSelector + '-' + col.props.span)) {
          e.target.closest('.' + this.state.colSelector + '-' + col.props.span).appendChild(this.state.dragged);
        }
      });

      this.setState({ dragged: null });
    }
  }

  onAdd() {
    if (this.state.editable) {

    }
  }

  onRemove(e) {
    if (this.state.editable && e.target.nextSibling) {
      e.target.parentNode.removeChild(e.target.nextSibling);
    }
  }

  render() {
    return (
      <div className={this.state.rowSelector}>
        {
          this.state.columns.map((col, val) => {
            return (
              <Droppable key={val}>
                <div onDrag={this.dragBegin.bind(this)}
                     onDrop={this.dragEnd.bind(this)}
                     key={val}
                     style={{padding: '20px 0'}}
                     className={this.state.colSelector + '-'
                             +  this.state.nativeColumns[val].props.span
                             + (this.state.nativeColumns[val].props.className ? ' '
                             +  this.state.nativeColumns[val].props.className : '')}>
                  <Draggable className="draggable" key={val}>
                    {this.state.editable ? <button onClick={this.onRemove.bind(this)}>remove</button> : ''}
                    {col}
                  </Draggable>
                </div>
              </Droppable>
            );
          })
        }
      </div>
    );
  }

}

export default Dashboard;