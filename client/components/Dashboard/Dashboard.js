import React from 'react';
import 'antd/lib/layout/style/css';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { Button } from 'antd';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rowClass: 'ant-row',
      colClass: 'ant-col',
      columns: null,
      dragged: null,
      editable: true,
      spanSize: (24 / this.props.numberOfColumns) || 24
    };
  }

  componentWillMount() {
    var cols = [];

    if (this.props.children && this.props.children.length > 0)
      cols = this.props.children;
    else if (this.props.children)
      cols.push(this.props.children);

    this.setState({ columns: cols });
  }

  setSpanSize(value) {
    this.setState({ spanSize: (24 / value) });
  }

  index(node) {
    if (node && node.parentNode) {
      var children = node.parentNode.childNodes;
      var num = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] == node) return num - 1;
        if (children[i].nodeType == 1) num++;
      }
      return -1;
    }
  }

  dragBegin(e) {
    if (this.state.editable) {
      this.setState({
        dragged: e.target.closest('.draggable')
      });
    }
  }

  dragEnd(e) {
    if (this.state.editable) {
      var droppedIndex = this.index(e.target.closest('.' + this.state.colClass + '-' + this.state.spanSize));
      var draggedIndex = this.index(this.state.dragged);

      if (!isNaN(droppedIndex) && !isNaN(draggedIndex)) {
        var cols = this.state.columns;

        if (draggedIndex > droppedIndex) {
          cols.splice(droppedIndex, 0, cols[draggedIndex]);
          cols.splice(draggedIndex + 1, 1);
        } else {
          cols.splice(droppedIndex + 1, 0, cols[draggedIndex]);
          cols.splice(draggedIndex, 1);
        }

        this.setState({ dragged: null });
      }
    }
  }

  onRemove(e) {
    if (this.state.editable && e.target.classList.contains('dashboard-card-remove-btn')) {
      var cols = this.state.columns;

      cols.splice(this.index(e.target.closest('.draggable')), 1);
      this.setState({ columns: cols });
    }
  }

  onEdit() {
    if (this.state.editable)
      this.setState({ editable: false });
    else
      this.setState({ editable: true });
  }

  render() {
    return (
      <div className="dashboard">
        <Button onClick={this.onEdit.bind(this)}>edit</Button>
        <Droppable> {/* can't "onDrop" bind with <Droppable> and need one more div inside <Droppable> */}
          <div onDrop={this.dragEnd.bind(this)}
               className={(this.state.editable ? 'edit' : '') + ' ' + this.state.rowClass}
               ref="dashboard">
            {
              this.state.editable ?
                <div>
                  <Button onClick={this.setSpanSize.bind(this, 1)}>1</Button>
                  <Button onClick={this.setSpanSize.bind(this, 2)}>2</Button>
                  <Button onClick={this.setSpanSize.bind(this, 3)}>3</Button>
                </div>
              : ''
            }
            {
              this.state.columns.map((col, val) => {
                return (
                  <Draggable onDrag={this.dragBegin.bind(this)}
                             enabled={this.state.editable}
                             className={'draggable ' + this.state.colClass + '-' + this.state.spanSize}
                             key={val}>
                    {col}
                    <div className="dashboard-card-controls">
                      {
                        this.state.editable ?
                          <Button className="dashboard-card-remove-btn icon-cross" onClick={this.onRemove.bind(this)}></Button>
                        : ''
                      }
                    </div>
                  </Draggable>
                );
              })
            }
          </div>
        </Droppable>
      </div>
    );
  }

}

export default Dashboard;