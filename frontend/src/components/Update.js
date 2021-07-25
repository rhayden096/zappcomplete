import React, { useState } from 'react';
import AppContext from '../context/AppContext';
import TaskItem from './TaskItem'
import { useContext } from 'react';


function Update() {
    const { setTask } = useContext(AppContext);
    const { data, setData } = useContext(AppContext);
    const { taskToDelete } = useContext(AppContext)





    //const [tempTask, setTempTask] = useState('');


    const handleDataClick = async () => {
        console.log("button clicked")

        const response = await fetch(`https://z-app-backend.herokuapp.com/test`,
            // const response = await fetch(`http://localhost:3001/test`,
            {
                credentials: 'include',
                method: 'get'
            });
        const listItems = await response.json();
        setData(listItems)
        console.log(data)
    }


    function formatData(d) {
        return (<>
            {d.map((item, index) => <TaskItem index={index} item={item}></TaskItem>)}
        </>)
    }



    const deleteHandler = (e) => {
        e.preventDefault();
        let bodyObject = { 'title': taskToDelete, 'description': '' }




        fetch(`https://z-app-backend.herokuapp.com/delete`, {
            // fetch(`http://localhost:3001/delete`, {
            credentials: 'include',
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify(bodyObject)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert(`${taskToDelete} was deleted!`)
            })

    }


    const updateUserHandler = (e) => {
        e.preventDefault();
        let bodyObject = {
            'newtask': document.getElementById('newtask').value
            , 'newdescription': document.getElementById('newdescription').value,
            'title': taskToDelete
        }
        console.log(bodyObject)
        fetch(`https://z-app-backend.herokuapp.com/update`, {
            // fetch(`http://localhost:3001/update`, {
            credentials: 'include',
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify(bodyObject)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message === 'task updated') {
                    alert('Task updated')
                }
            })
    }
    return (
        <div className="taskBox">
            <p>
                Instructions: click on a added task, then update and delete said task if desired. you can update
                any list item by clicking on the item and then typing a new task and description then click update.
            </p>
            <br></br>
            <p className="workAround">{`${taskToDelete} selected for update/delete`}</p>
            <br></br>

            <form onSubmit={updateUserHandler}>
                <label>Update task:   </label>
                <input id="newtask" type="text" />
                <br></br>
                <label>Update description:   </label>
                <input id="newdescription" type="text" />
                <br></br>
                <input className="updateButton" type="submit" value="Update" data-test="submit" />
                <button className="updateButton" onClick={deleteHandler} > Delete </button>
                <div value="task" onChange={e => setTask(e.target.value)} >{formatData(data)}</div>
            </form>


            <button className="updateButton" onClick={handleDataClick}> Click here to update changes to the task list </button>


        </div>

    )

}

export default Update