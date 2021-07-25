
import React, { useState } from "react";
import AppContext from './context/AppContext';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar"
import Form from "./components/Form";
import Update from "./components/Update.js"
import "./App.css";


function App() {
  const [data, setData] = useState([])
  const [taskToDelete, setTaskToDelete] = useState("")
  const [task, setTask] = useState("")
  const [description, setDescription] = useState("")





  return (
    <div className="App">
      <header className="App-header">
        <AppContext.Provider value={
          {
            data, setData,
            task, setTask,
            description, setDescription,
            taskToDelete, setTaskToDelete
          }
        }>

          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact> <Form /> </Route>
              <Route path="/Update" exact><Update /></Route>

            </Switch>



          </Router>

        </AppContext.Provider>





      </header>
    </div>
  )
}

export default App