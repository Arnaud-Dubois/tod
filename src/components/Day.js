import React from 'react';

export default function Day() {
  const date = new Date()
  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.toLocaleString('default', { month: 'short' });
  const weekday = date.toLocaleString('default', { weekday: 'long' });

  return (
    <div className="columns">
      <div className="column">
          <div
            style={{fontSize: '4rem', lineHeight: '1'}}
            className="is-pulled-right has-text-weight-bold has-text-black">
              {day}
          </div>
      </div>
      <div className="column ">
          <div className="is-size-4 has-text-black has-text-weight-semibold is-capitalized">{weekday}</div>
          <div className="is-size-5 has-text-black is-uppercase">{month + year}</div>
      </div>
    </div>
  );
}




{/* <div className="columns">
  <div className="column is-half is-offset-one-quarter">
    <div className="tile is-ancestor is-gapless">
        <div className="tile is-parent">
          <div className="tile is-child">
            <span className="is-size-1 is-pulled-right">{day}</span>
          </div>
        </div>
        <div className="tile is-4 is-vertical is-parent">
          <div className="tile is-child">
            <span className="is-size-5">{weekday}</span>
          </div>
          <div className="tile is-child">
            <span className="is-size-5">{month + year}</span>
          </div>
        </div>
    </div>
  </div>
</div> */}