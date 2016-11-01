import React from 'react';

class Card extends React.Component {

  render() {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-controls">
          <p className="dashboard-card-title">Title</p>
        </div>
        <p>{this.props.children}</p>
      </div>
    );
  }

}

export default Card;