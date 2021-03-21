import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './ToDo.css'
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Tasks from '../Tasks/Tasks';
import AddTask from '../AddTask/AddTask';
import Confirm from '../Modals/RemuveModal';
import EditTaskModal from '../Modals/EditTaskModal';
// import NavBar from '../Navbar/NavBar';

class ToDo extends Component {
  state = {
    editTask: null,
    tasks: [],
    selectidTasks: new Set(),
    toggle: false
  }

  componentDidMount() {
    fetch("http://localhost:3001/task",
      {
        method: "GET",
      })
      .then((result) => result.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        response.reverse()
        this.setState({
          tasks: response,
        })
      })
      .catch((error) => console.log(error))

  }

  onHandleAddClik = (date) => {
    const body = JSON.stringify(date)
    fetch("http://localhost:3001/task",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body
      })
      .then((result) => result.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        const taskArr = [response, ...this.state.tasks];
        this.setState({
          tasks: taskArr,
        })
      })
      .catch((error) => console.log(error))
  }

  onHandleDelete = (taskId) => {
    fetch(`http://localhost:3001/task/${taskId}`,
      {
        method: "DELETE",
      })
      .then((result) => result.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        const newTasks = this.state.tasks.filter(task => task._id !== taskId)

        this.setState({
          tasks: newTasks
        })
      })
      .catch((error) => console.log(error))

  }

  toggleConfirm = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  toggleEditModal = (task) => {
    this.setState({
      editTask: task
    })
  }

  saveTask = (editedTask) => {
    fetch(`http://localhost:3001/task/${editedTask._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(editedTask)
      })
      .then((result) => {
        if (result.status >= 200 && result.status < 300) {
          const tasks = [...this.state.tasks];
          const foundTaskIndex = tasks.findIndex((task) => task._id === editedTask._id);
          tasks[foundTaskIndex] = editedTask;
          this.setState({
            tasks: tasks,
            editTask: null
          })
        } else {
          throw result.error;
        }
        result.json()
      })
      .catch((error) => console.log(error))
  }

  removeSelected = () => {
    let body = {
      tasks: [...this.state.selectidTasks]
    };

    fetch("http://localhost:3001/task",
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then((result) => result.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }

        let tasks = [...this.state.tasks]

        this.state.selectidTasks.forEach((id) => {
          tasks = tasks.filter((task) => task._id !== id)
        })

        this.setState({
          tasks: tasks,
          selectidTasks: new Set(),
          toggle: false
        })

      })
      .catch((error) => console.log(error))

  }

  handleCheck = (taskId) => {
    const selectidTasks = new Set(this.state.selectidTasks)
    if (selectidTasks.has(taskId)) {
      selectidTasks.delete(taskId)
    } else {
      selectidTasks.add(taskId)
    }
    this.setState({
      selectidTasks: selectidTasks
    })
  }

  render() {

    const { tasks, selectidTasks, toggle, editTask } = this.state

    return (
      <div className='wraperDiv'>
        <Container>
          <AddTask
            onAdd={this.onHandleAddClik}
            disabled={!!selectidTasks.size}
            onClose={() => this.toggleEditModal(null)}
          />
        </Container>
        <Container maxWidth='md' className='taskContainer'>
          <Grid container item xs={1} sm={6} md={12} spacing={4} >
            {
              tasks.map((task) => {
                return (
                  <span key={task._id}>
                    <Tasks
                      item={task}
                      handleDelete={this.onHandleDelete}
                      onCheck={this.handleCheck}
                      disabled={!!selectidTasks.size}
                      onEdit={() => this.toggleEditModal(task)}
                    />
                  </span>
                )
              })
            }
          </Grid>
          <div className='removeBtn'>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.toggleConfirm}
              disabled={!selectidTasks.size}
            >
              Remove selected
          </Button>
          </div>
        </Container>
        {
          toggle &&
          <Confirm
            onClose={this.toggleConfirm}
            onSubmit={this.removeSelected}
            count={selectidTasks.size}
          />
        }

        {
          !!editTask &&
          <EditTaskModal
            date={editTask}
            onSave={this.saveTask}
            onClose={() => this.toggleEditModal(null)}
          />

        }

      </div>
    )
  }
}

export default ToDo