import react from 'react'
import AppContext from '../context/AppContext';
import { useContext } from 'react'

function Form() {
  const { task, setTask } = useContext(AppContext);
  const { description, setDescription } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)

    let bodyObject = { 'title': task, 'description': description }

    fetch(`https://z-app-backend.herokuapp.com/newtask`, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
      },
      body: JSON.stringify(bodyObject)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.message === 'successfully added new task in view tasks!') {
          alert('successfully added new task in view tasks!')
        }
      })

  }
  return (
    <div className="enterTask">
      <form onSubmit={handleSubmit}>
        <label>Enter Task</label>
        <input type="text" data-test="task" value={task} onChange={e => setTask(e.target.value)} />
        <br></br>
        <label>Enter Task Description</label>
        <input type="text" data-test="description" value={description} onChange={e => setDescription(e.target.value)} />
        <br></br>
        <input calssName="updateButton" type="submit" value="Add Task" data-test="submit" />
      </form>
    </div>
  );
};

export default Form