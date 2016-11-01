import React from 'react';

class Card extends React.Component {

  render() {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-controls">
          <p className="dashboard-card-title">Title</p>
        </div>
        <div className="dashboard-card-body">
          <p>{this.props.children}</p>
        </div>
      </div>
    );
  }

}

export default Card;