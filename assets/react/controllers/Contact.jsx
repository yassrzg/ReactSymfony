import { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AccountCircle from '@mui/icons-material/AccountCircle';



// ALERT

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Contact() {

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [objet, setObjet] = useState('');
    const [objetError, setObjetError] = useState('');

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [open, setOpen] = useState(false);

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        setDescriptionError('');
    }
    function handleEmailChange(event) {
        setEmail(event.target.value);
        setEmailError('');
    }

    function handleNameChange(event) {
        setName(event.target.value);
        setNameError('');
    }
    function handleObjetChange(event) {
        setObjet(event.target.value);
        setObjetError('');
    }

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };

    function  handleSubmit (e){
        e.preventDefault();
        if (!email) {
            setEmailError('Vous entrez un email valide.');
            return;
        }
        if (!name) {
            setNameError('Entrez votre prénom.');
            return;
        }
        if (!objet) {
            setObjetError('Entrez un objet de contact.');
            return;
        }

        if (!description) {
            setDescriptionError('Vous devez écrire une description.');
            return;
        }

        if(email && name && objet && description) {
            setFormSubmitted(true);
            setOpen(true);

            axios.post('/api/setContact', {
                email: email,
                name: name,
                objet: objet,
                description: description
            }).then(response => {
                // Réinitialiser les valeurs des champs
                setEmail('');
                setName('');
                setObjet('');
                setDescription('');
            }).catch(error => {
                // Gérer les erreurs
                console.error(error);
            });



        }
    }
    return(
        <div>
            {!formSubmitted && (
                <form>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& > :not(style)': { m: 1 },
                        }}
                    >
                        <TextField
                            helperText="Please enter your email"
                            id="email-input"
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </Box>
                    {emailError && (
                        <Typography variant="caption" color="error">
                            {emailError}
                        </Typography>
                    )}
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                helperText="Please enter your name"
                                id="name-input"
                                label="Name"
                                variant="standard"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </Box>
                    </Box>
                    {/*<Box*/}
                    {/*    sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        alignItems: 'center',*/}
                    {/*        '& > :not(style)': { m: 1 },*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <TextField*/}
                    {/*        helperText="Please enter your name"*/}
                    {/*        id="name-input"*/}
                    {/*        label="Name"*/}
                    {/*        value={name}*/}
                    {/*        onChange={handleNameChange}*/}
                    {/*    />*/}
                    {/*</Box>*/}
                    {nameError && (
                        <Typography variant="caption" color="error">
                            {nameError}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& > :not(style)': { m: 1 },
                        }}
                    >
                        <TextField
                            helperText="Please enter the subject"
                            id="objet-input"
                            label="Objet"
                            value={objet}
                            onChange={handleObjetChange}
                        />
                    </Box>
                    {objetError && (
                        <Typography variant="caption" color="error">
                            {objetError}
                        </Typography>
                    )}
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={description}
                            onChange={handleDescriptionChange}
                            fullWidth
                        />
                    </Box>
                    {descriptionError && (
                        <Typography variant="caption" color="error">
                            {descriptionError}
                        </Typography>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Soumettre l'avis
                        </Button>
                    </Box>
                </form>
            )}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                        Message envoyé!
                    </Alert>
                </Snackbar>
            </Stack>


        </div>
    );
}