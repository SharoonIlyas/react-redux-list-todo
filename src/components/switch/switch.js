import React from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FILTERS } from '../../constants/filter';
import { selectCompleted, selectNotCompleted, selectVisible } from '../../store/selectors/todo';

import { onFilterSelect } from '../../store/actions/filter';

export function Switch() {
  const filterTitles = [
    { key: FILTERS.all, value: 'All' },
    { key: FILTERS.active, value: 'Active' },
    { key: FILTERS.completed, value: 'Completed' }
  ];
  const dispatch = useDispatch();
  const completedCount = useSelector(state => selectCompleted(state.todos).length);

  const itemsLeft = useSelector(state => selectNotCompleted(state.todos).length);
  const itemsCompleted = useSelector(state => selectCompleted(state.todos).length);
  const itemsAll =  useSelector(state => selectVisible(state.todos).length);
  const filter = useSelector(state => state.filter);
  const filterSelect = selectedFilter => dispatch(onFilterSelect(selectedFilter));

  const itemText = itemsLeft === 1 ? 'item' : 'items';




  const mystyle = {
    color: "DarkBlue",
    backgroundColor: "LightBlue",
    padding: "8px",
    textDecoration:"none",
    fontSize: "10px",
    hover: "Blue",
    borderRadius:"10px",
    };

    const spaceStyle = {marginTop: "10px"};



  return (



    <div className ='footer' >
      <span className="todo-count">
      <div style={spaceStyle}></div>
      <a style={mystyle} href="./#" onClick={() =>{filterSelect(FILTERS.all)}}>Tasks Total: {itemsAll} </a>
      <div style={spaceStyle}></div>

      <a style={mystyle} href="./#" onClick={() =>{filterSelect(FILTERS.completed)}}>Tasks Completed: {itemsCompleted} </a>
      <div style={spaceStyle}></div>

      <a  style={mystyle} href="./#" onClick={() =>{filterSelect(FILTERS.active)}}>Tasks Left: {itemsLeft}</a>
      <div style={spaceStyle}></div>

      </span>
      <ul className="filters">
        {filterTitles.map(filterTitle => (
          <li key={filterTitle.key}>
            <a href="./#" className={classNames({ selected: filterTitle.key === filter })}
              onClick={() =>{filterSelect(filterTitle.key)}}>
              {filterTitle.value}
            </a>
          </li>
        ))}
      </ul>
      </div>
  );
}
