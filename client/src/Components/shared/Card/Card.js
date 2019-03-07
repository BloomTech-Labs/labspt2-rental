import React from 'react';

const Card = (props) => {


    return (
      <div>
        <h2>{ props.title }</h2>
        <div className="top-border-line" />
        <div>
          { props.icon }
        </div>
        <h4>{ props.subtitle }</h4>
      </div>
    )
}

export default Card;