import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTtypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './AddTask.css';



class AddTask extends Component {

  state = {
    title: '',
    description: '',
    toggle: false,
    date: new Date()
  }

  onHandleChange = (event, type) => {
    this.setState({
      [type]: event.target.value
    })
  }

  addTask = () => {
    const { title, description, date } = this.state

    if (!title) {
      return
    }
    const task = {
      title,
      description,
      date: date
    }
    this.props.onAdd(task)

    this.setState({
      description: '',
      title: ''
    })
    this.toggleAddModal()
  }

  handleDateChange = (date) => {
    this.setState({
      date: date.target.value
    })
  }

  onHandleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.addTask()
    }
  }

  toggleAddModal = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    const { title, description, toggle, date } = this.state
    const { disabled } = this.props;
    return (
      <>
        <Button
          variant="contained"
          color="primary" d
          onClick={this.toggleAddModal}
          disabled={!!disabled}
        >
          Add
      </Button>
        {toggle &&
          <Dialog
            open={true}
            aria-labelledby="form-dialog-title"
            onClose={() => this.toggleAddModal()}
          >
            <DialogTitle
              id="form-dialog-title"
              onKeyDown={(event) => this.onHandleKeyDown(event)}
            >
              Add your messege and descripron
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Add your task"
                fullWidth
                onChange={(event) => this.onHandleChange(event, 'title')}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                id="standard-textarea"
                label="Add your description"
                multiline
                onChange={(event) => this.onHandleChange(event, 'description')}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                id="date"
                label="Date"
                type="date"
                // defaultValue={date}
                onChange={(event) => this.handleDateChange(event, 'date')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.addTask}
                disabled={!title}
              >
                Add
                    </Button>
              <Button
                color="secondary"
                onClick={() => this.toggleAddModal()}
              >
                Cancel
                    </Button>
            </DialogActions>
          </Dialog>}
      </>
    )
  }
}

AddTask.PropTtypes = {
  disabled: PropTtypes.bool,
}



export default AddTask