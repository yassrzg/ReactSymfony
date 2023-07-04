import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';


import '../../../public/assets/css/styleReact.css';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Account() {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const minLength = 12;
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;


    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    function handleConfirmPasswordChange(event) {
        const confirmationPassword = event.target.value;
        setConfirmPassword(confirmationPassword);
        if (password !== confirmationPassword) {
            setPasswordError('Les mots de passe ne correspondent pas.');
        } else {
            setPasswordError('');
        }
    }



    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    function handleSubmit(e) {
        e.preventDefault();

        if (!passwordRegex.test(password)) {
            setPasswordError('Veuillez utiliser des caractères spéciaux et 8 carractère minimum');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError('Les mots de passe ne correspondent pas');
            return;
        }

        if (password && confirmPassword) {
            setOpen(true);

            axios
                .post('/api/setNewDataUserPassword', {
                    password: password,
                })
                .then(response => {
                    setPassword('');
                    setConfirmPassword('');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    return (
        <div id="page-account">
            <div id="modal-account2">
                <Button onClick={handleOpenModal}>Changer mon mot de passe</Button>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box id="box-modal">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Changer mon mot de passe
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <form id="form-account">
                                <div className="container-contact">
                                    <div className="password">
                                         <span className="p-float-label">
                                            <Password
                                                inputId="password"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                toggleMask
                                            />
                                            <label htmlFor="password">Password</label>
                                         </span>
                                    </div>
                                    <div className="confirmPassword">
                                        <span className="p-float-label">
                                            <Password
                                                inputId="confirm-password"
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                                toggleMask
                                            />
                                            <label htmlFor="password">Confirm Password</label>
                                        </span>
                                    </div>
                                    <div className="account-setting-message">
                                        {passwordError && <p className="error-message">{passwordError}</p>}
                                    </div>


                                    <Box sx={{ '& > :not(style)': { m: 1 }, width: '80%' }} id="button">
                                        <Button variant="contained" onClick={handleSubmit} id="submit-button">
                                            Sauvegarder
                                        </Button>
                                    </Box>
                                </div>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                        Nouveau mot de passe enregistré !
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}
