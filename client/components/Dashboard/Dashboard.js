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
      nativeColumns: null,
      columns: null,
      dragged: null,
      spanSize: this.props.spanSize
    };
  }

  componentWillMount() {
    var nativeCols = [];
    var cols = [];

    if (this.props.children && this.props.children.length > 0) {
      cols = this.props.children;
      nativeCols = this.props.children;
    } else if (this.props.children) {
      cols.push(this.props.children);
      nativeCols.push(this.props.children);
    }

    this.setState({ nativeColumns: nativeCols, columns: cols });
  }

  setSpanSize(value) {
    this.setState({ spanSize: value });
  }

  dragBegin(e) {
    if (this.props.editable) {
      this.setState({
        dragged: e.target.closest('.draggable'),
        draggedParent: e.target.closest('.draggable').closest('.' + this.state.colClass + '-' + this.state.spanSize)
      });
    }
  }

  dragEnd(e) {
    if (this.props.editable) {
      var index = (node) => {
        var children = node.parentNode.childNodes;
        var num = 0;
        for (var i = 0; i < children.length; i++) {
          if (children[i] == node) return num;
          if (children[i].nodeType == 1) num++;
        }
        return -1;
      };

      var item_1 = index(e.target.closest('.' + this.state.colClass + '-' + this.state.spanSize)) - 1;
      var item_2 = index(this.state.dragged) - 1;

      var cols = this.state.columns;
      cols.splice(item_1, 0, cols[item_2]);

      if (item_2 > item_1) {
        cols.splice(item_2 + 1, 1);
      } else {
        cols.splice(item_2, 1);
      }

      this.setState({ dragged: null });
    }
  }

  onRemove(e) {
    if (this.props.editable && e.target.classList.contains('dashboard-card-remove-btn'))
      e.target.closest('.draggable').style.display = 'none';
  }

  render() {
    return (
      <Droppable>
        <div onDrop={this.dragEnd.bind(this)} className={"dashboard " + (this.props.editable ? 'edit' : '') + ' ' + this.state.rowClass} ref="dashboard">
          {
            this.props.editable ?
              <div>
                <Button onClick={this.setSpanSize.bind(this, 24)}>1</Button>
                <Button onClick={this.setSpanSize.bind(this, 12)}>2</Button>
                <Button onClick={this.setSpanSize.bind(this, 8)}>3</Button>
              </div>
            : ''
          }
          {
            this.state.columns.map((col, val) => {
              return (
                <Draggable onDrag={this.dragBegin.bind(this)}
                           enabled={this.props.editable}
                           className={'draggable ' + this.state.colClass + '-' + this.state.spanSize}
                           key={val}>
                  {col}
                  <div className="dashboard-card-controls">
                    {
                      this.props.editable ?
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
    );
  }

}

export default Dashboard;