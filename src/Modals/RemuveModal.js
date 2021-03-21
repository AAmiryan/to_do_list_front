import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTtypes from 'prop-types'

export default function Confirm(props) {

    return (
        <Dialog
            open={true}
            // onClose={true}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{`Are you sure you want to delete this ${props.count} tasks`}</DialogTitle>
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={props.onSubmit}>
                    Delete
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={props.onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}


Confirm.PropTtypes = {
    count: PropTtypes.number,
    onSubmit: PropTtypes.func,
    onClose: PropTtypes.func
}