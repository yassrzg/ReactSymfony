import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';


import '../../../public/assets/css/styleReact.css';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ResetPassword ( {token} ) {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const minLength = 12;
    const [open, setOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;





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

    const handleCloseNotificationPassword = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPassword(false);
    };


    function handleSubmit(e) {
        e.preventDefault();

        if (!passwordRegex.test(password)) {
            setPasswordError('Veuillez utiliser des caractères spéciaux et 8 carractère minimum');
            setOpenPassword(true);
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError('Les mots de passe ne correspondent pas');
            setOpenPassword(true);
            return;
        }

        if (password && confirmPassword) {
            setOpen(true);

            axios
                .post(`/api/updatePassword/${token}`, {
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

            <form id="form-resetPassword">
                <div className="container-resetPassword">
                    <div className="reset-password">
                                         <span className="p-float-label">
                                            <Password
                                                inputId="password-reset"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                toggleMask
                                            />
                                            <label htmlFor="password">Password</label>
                                         </span>
                    </div>
                    <div className="confirm-reset-Password">
                                        <span className="p-float-label">
                                            <Password
                                                inputId="confirm-password-reset"
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

                </div>
                <Box sx={{ '& > :not(style)': { m: 1 }, width: '100%' }} id="button-resetPassword">
                    <Button variant="contained" onClick={handleSubmit} id="submit-button-resetPassword">
                        Réinitialiser<span></span>
                    </Button>
                </Box>
            </form>


            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                        Mot de passe réinitialisé
                    </Alert>
                </Snackbar>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openPassword} autoHideDuration={3000} onClose={handleCloseNotificationPassword}>
                    <Alert onClose={handleCloseNotificationPassword} severity="error" sx={{ width: '100%' }}>
                        {passwordError}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}
