import React from "react";
import classNames from "classnames"

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayListItemClass = classNames("day-list__item", { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 })
  
  function formatSpots() {
    return (props.spots === 0 ? 'no spots remaining' : props.spots === 1 ? `${props.spots} spot remaining` : `${props.spots} spots remaining`);
  }

  return (
    <li data-testid="day" className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}