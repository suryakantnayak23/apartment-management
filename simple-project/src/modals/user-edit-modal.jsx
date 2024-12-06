import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px', // Updated width
    height: '500px', // Updated height
    overflowY: 'auto', // Ensure content is scrollable if it overflows
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2, // Rounded corners for a better look
    p: 4,
};

const defaultUser = {
    name: '',
    registrationStatus: '',
    address: '',
    phone: '',
    email: '',
    ownerType: '',
    userType: '',
    userTag: '',
    approvalDetails: '',
};

export default function EditModal({ open, handleClose, user, handleUpdate }) {
    const [editedUser, setEditedUser] = useState(defaultUser);

    useEffect(() => {
        if (user) {
            setEditedUser(user);
        } else {
            setEditedUser(defaultUser);
        }
    }, [user]);

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(editedUser);
        handleClose();
    };

    if (!open) return null;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="name"
                        label="Name"
                        value={editedUser.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="registrationStatus"
                        label="Registration Status"
                        value={editedUser.registrationStatus}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="address"
                        label="Address"
                        value={editedUser.address}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="phone"
                        label="Phone"
                        value={editedUser.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="email"
                        label="Email"
                        value={editedUser.email}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="ownerType"
                        label="Owner Type"
                        value={editedUser.ownerType}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="userType"
                        label="User Type"
                        value={editedUser.userType}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="userTag"
                        label="User Tag"
                        value={editedUser.userTag}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="approvalDetails"
                        label="Approval Details"
                        value={editedUser.approvalDetails}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Update
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

