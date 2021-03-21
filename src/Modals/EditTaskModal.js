import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

export default class EditTaskModal extends Component {
    constructor(props) {
        super(props)
        const { date } = props.date
        this.state = {
            ...this.props.date,
            date: date ? new Date(date) : new Date()
        }
    }

    componentDidMount() {
        this.setState({
            ...this.props.date

        })
    }

    handleChange = (event, type) => {
        this.setState({
            [type]: event.target.value
        })

    }

    handleDateChange = (date) => {
        this.setState({
            date: date.target.value
        })
    }

    onAdd = () => {
        const { title, date} = this.state
        if (!title) {
            return
        }
        this.props.onSave({ ...this.state, date:`${moment(date).format('YYYY-MM-DD')}`})
        this.props.onClose()
    }

    render() {
        const { title, description, date } = this.state
        return (

            <Dialog
                open={true}
                aria-labelledby="form-dialog-title"
                onClose={this.props.onClose}>
                <DialogTitle id="form-dialog-title">Do you want to edit this task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        defaultValue={title}
                        label="Edit your task"
                        fullWidth
                        onChange={(event) => this.handleChange(event, 'title')}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        id="standard-textarea"
                        label="Edit your description"
                        multiline
                        defaultValue={description}
                        onChange={(event) => this.handleChange(event, 'description')}
                    />
                </DialogContent>
                <DialogContent>

                    <TextField
                        id="date"
                        name='date'
                        label="Date"
                        type="date"
                        defaultValue={moment(date).format("YYYY-MM-DD")}
                        onChange={(event) => this.handleDateChange(event)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={this.onAdd}
                    >
                        Add
                    </Button>
                    <Button
                        color="secondary"
                        onClick={this.props.onClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )

    }
}
