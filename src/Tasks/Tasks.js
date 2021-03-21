import React, { Component } from 'react';
import { Grid, IconButton, ListSubheader } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import './Tasks.css';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom'

class Tasks extends Component {
    state = {
        checked: false
    }

    handleCheck = () => {
        this.setState({
            checked: !this.state.checked

        })
        const { onCheck, item } = this.props
        onCheck(item._id)
    }
    render() {
        const { item, disabled } = this.props
        const itemData = moment(item.date).format('DD/MM/YYYY');
        const createdAt = moment(item.created_at).format('DD/MM/YYYY');
        return (
            <div className='wrapDiv'>
                <Grid className={`tasks ${this.state.checked ? ' checked ' : ''}`} >
                    <Checkbox
                        defaultChecked={false}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onClick={() => this.handleCheck()}
                        key={item._id}
                    />
                    <ListSubheader >
                        <Link  
                        to= {`/task/${item._id} `} 
                        className = 'titleText'
                        >
                            {item.title}
                        </Link>
                    </ListSubheader>
                    <ListSubheader>
                        Description: {item.description}
                    </ListSubheader>
                    <ListSubheader>
                        Date: {itemData}
                    </ListSubheader>
                    <ListSubheader>
                        Created At:{createdAt}
                    </ListSubheader>
                    <IconButton
                        onClick={() => { this.props.handleDelete(this.props.item._id) }}
                        disabled={disabled}
                    >
                        <DeleteIcon
                            color={disabled ? 'outlined' : 'secondary'}
                        />
                    </IconButton>
                    <IconButton
                        onClick={() => this.props.onEdit(this.props.item)}
                    >
                        <EditIcon
                            color={disabled ? 'outlined' : "primary"} />
                    </IconButton>
                </Grid>
            </div>
        )

    }
}

export default Tasks;