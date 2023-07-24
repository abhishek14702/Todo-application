import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todolist, setTodoList] = useState([]);
  const [newtask, setNewtask] = useState("");
  const [expiryHours, setExpiryHours] = useState(0); // State to store the expiry hours
  const [expiryMinutes, setExpiryMinutes] = useState(0); // State to store the expiry minutes
  const [taskDescription, setTaskDescription] = useState(""); // State to store the task description
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  const handleChange = (event) => {
    setNewtask(event.target.value);
  };



const handleExpiryHoursChange = (event) => {
  setExpiryHours(Number(event.target.value));
};

const handleExpiryMinutesChange = (event) => {
  setExpiryMinutes(Number(event.target.value));
};


  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const addtask = () => {
    const totalExpirySeconds = expiryHours * 3600 + expiryMinutes * 60;
    setTodoList([...todolist, { task: newtask, expiry: totalExpirySeconds, remainingTime: totalExpirySeconds, description: taskDescription }]);
    setNewtask(""); // Clear the input after adding the task
    setExpiryHours(0); // Reset the expiry hours input
    setExpiryMinutes(0); // Reset the expiry minutes input
    setTaskDescription(""); // Clear the description input
  };

  const removeTask = (index) => {
    const updatedList = [...todolist];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  const handleSearch = () => {
    // Filter the todolist based on the search query
    const filteredList = todolist.filter((task) =>
      task.task.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTodoList(filteredList);
  };

  useEffect(() => {
    const taskTimers = todolist.map((task, index) => {
      return setInterval(() => {
        setTodoList((prevList) =>
          prevList.map((item, idx) =>
            idx === index
              ? { ...item, remainingTime: item.remainingTime - 1 }
              : item
          )
        );
      }, 1000);
    });

    return () => {
      // Clear all the timers when the component unmounts or the todolist changes
      taskTimers.forEach((timer) => clearInterval(timer));
    };
  }, [todolist]);

  const renderCards = () => {
    return todolist.map((task, index) => {
      const hours = Math.floor(task.remainingTime / 3600);
      const minutes = Math.floor((task.remainingTime % 3600) / 60);
      return (
        <div key={index} className="col-md-3 mb-4">
          <div className="card card-custom">
            <div className="card-body">
              <h5 className="card-title text-lightgreen">{task.task}</h5>
              <p className="card-text">{task.description}</p>
              <p className="card-text">
                Expires in: {hours} hours {minutes} minutes
              </p>
              <button className="btn btn-danger" onClick={() => removeTask(index)}>
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  

    // ... (previous code)

    return (
      <div className="container-fluid mt-5 bg-lightblue">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-3">
              <div className="addtask mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task"
                  value={newtask}
                  onChange={handleChange}
                />
                <div className="d-flex">
                  <input
                    type="number"
                    className="form-control "
                    placeholder="Hours"
                    value={expiryHours}
                    onChange={handleExpiryHoursChange}
                  />
                  <span className="mt-2 mx-2">hours</span>
                  <input
                    type="number"
                    className="form-control "
                    placeholder="Minutes"
                    value={expiryMinutes}
                    onChange={handleExpiryMinutesChange}
                  />
                  <span className="mt-2 mx-2">minutes</span>
                </div>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Description"
                  value={taskDescription}
                  onChange={handleDescriptionChange}
                />
                <button className="btn btn-primary mt-2" onClick={addtask}>Add task</button>
              </div>
              <div className="search mb-3">
                <input
                  type="text"
                  className="form-control col-md-9 col-lg-10"
                  placeholder="Search task"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary col-md-3 col-lg-2" onClick={handleSearch}>Search</button>
              </div>
              <div className="row">
                {renderCards()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;