import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Item({ todo, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.name);



  const ENTER_KEY = 'Enter'
  const handleEdit = () => setEditing(true);
  const handleCompleted = () => {
    onUpdate({
      id: todo.id,
      completed: !todo.completed
    });



  };
  const handleRemove = () => onRemove(todo.id);
  const handleChange = event =>setName(event.target.value)
  const handleSubmit = event => {
    if (event.key !== ENTER_KEY) {
      return;
    }
    if(name==="")
    {
      alert("Task Cannot Be empty");
    }

    else if(name!==""){
      onUpdate({
        id: todo.id,
        name
      });

    }
    setEditing(false);

  }
  const handleBlur = () => {
    onUpdate({
      id: todo.id,
      name
    });
    setEditing(false);
  };
  const { completed } = todo;


  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
    function toggle() { setIsActive(!isActive);}
    function reset() {
      setSeconds(0);
      setIsActive(false);
    }
    useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]);


  const mystyle = {
      color: "DarkBlue",
      backgroundColor: "LightBlue",
      fontFamily: "Arial",
      fontSize: "12px",
      marginLeft: "8px",
      padding:"6px",
      borderRadius:"15px",


    };
  const counterstyle = {
        color: "DarkBlue",
        padding: "10px",
        fontSize: "10px",
        marginTop: "4px",
        marginBottom: "4px",


      };
  const buttonstyle  ={  color: "DarkBlue",
    backgroundColor: "LightBlue",
    fontSize: "10px",
    padding:"6px",
    borderRadius:"15px",
    marginLeft: "8px",
  }


  return (


    <li className={classNames({ completed, editing })} data-testid="todo-item">
      <div className="view">
      <span>
      <input style ={mystyle} type="checkbox" checked={completed} onChange={()=>{handleCompleted(); toggle();}} />

      </span>
      <label>{todo.name}</label>

        <button   style={mystyle} onClick={handleEdit} data-testid="todo-name">Edit</button>
        <button style ={buttonstyle} className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`}

        onClick={()=>{
          if(!isActive){ toggle() }
          else if(isActive){ toggle(); handleCompleted();}}}>
             {isActive ? 'Finish Task' : 'Start Task'} {seconds} s
           </button>
        <button className="destroy" onClick={handleRemove} data-testid="todo-remove" />

      </div>
       {editing && (<input className="edit" value={name} onInput={handleChange}   onKeyUp={handleSubmit} onBlur={handleBlur} onChange={() => {}}/>) }

    </li>

  );
}

Item.propTypes = {
  todo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};
