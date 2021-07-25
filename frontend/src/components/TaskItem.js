import React from 'react';
import AppContext from '../context/AppContext';
import { useContext } from 'react'

function TaskItem(props) {
    const { setTaskToDelete } = useContext(AppContext);






    return (

        <ul id="listItem" className="unorderedTask" >
            <li
                className="taskList"
                onClick={e => {
                    console.log(e)
                    setTaskToDelete(e.target.childNodes[1].data);




                }}
                key={props.index}>
                Task:{props.item.title}<br />description: {props.item.description}
            </li>
        </ul>

    );


}

export default TaskItem