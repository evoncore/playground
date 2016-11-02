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
      editable: false,
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

  dragBegin(e) {
    if (this.state.editable) {
      this.setState({
        dragged: e.target.closest('.draggable'),
        draggedParent: e.target.closest('.draggable').closest('.' + this.state.colClass + '-' + this.state.spanSize)
      });
    }
  }

  dragEnd(e) {
    if (this.state.editable) {
      var index = (node) => {
        if (node && node.parentNode) {
          var children = node.parentNode.childNodes;
          var num = 0;
          for (var i = 0; i < children.length; i++) {
            if (children[i] == node) return num;
            if (children[i].nodeType == 1) num++;
          }
          return -1;
        }
      };

      var item_1 = index(e.target.closest('.' + this.state.colClass + '-' + this.state.spanSize)) - 1;
      var item_2 = index(this.state.dragged) - 1;

      if (!isNaN(item_1) && !isNaN(item_2)) {
        var cols = this.state.columns;

        if (item_2 > item_1) {
          cols.splice(item_1, 0, cols[item_2]);
          cols.splice(item_2 + 1, 1);
        } else {
          cols.splice(item_1 + 1, 0, cols[item_2]);
          cols.splice(item_2, 1);
        }

        this.setState({ dragged: null });
      }
    }
  }

  onRemove(e) {
    if (this.state.editable && e.target.classList.contains('dashboard-card-remove-btn'))
      e.target.closest('.draggable').style.display = 'none';
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