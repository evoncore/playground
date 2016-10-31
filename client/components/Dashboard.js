import React from 'react';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: this.props.editable,
      rowSelector: this.props.rowSelector || '',
      colSelector: this.props.colSelector || '',
      nativeColumns: null,
      columns: null
    };
  }

  componentWillMount() {

    // columns
    if (this.props.children && this.props.children.length > 0) {
      var cols = [];

      this.props.children.map(row => {
        row.props.children.map(col => {
          cols.push(col.props.children);
        });
      });

      this.setState({ columns: cols });
    } else if (this.props.children) {

      if (this.props.children.props.children && this.props.children.props.children.length > 0) {
        var nativeCols = [];
        var cols = [];

        this.props.children.props.children.map(col => {
          nativeCols.push(col);
          cols.push(col.props.children);
        });

        this.setState({ nativeColumns: nativeCols, columns: cols });
      } else if (this.props.children.props.children) {

      }
    }
  }

  onClick(e) {
    this.state.columns.map(col => {
      if (!e.target.closest('.' + this.state.colSelector + '-' + col.props.span)) {
      }
    });
  }

  onMove() {
    if (this.state.editable) {

    }
  }

  onAdd() {
    if (this.state.editable) {

    }
  }

  onRemove() {
    if (this.state.editable) {

    }
  }

  render() {
    return (
      <div className={this.state.rowSelector}>
        {
          this.state.columns.map((col, val) => {
            return <div key={Date.now() + Math.random()}
                        onClick={this.onClick.bind(this)}
                        className={this.state.colSelector + '-' + this.state.nativeColumns[val].props.span}>{col}</div>
          })
        }
      </div>
    );
  }

}

export default Dashboard;