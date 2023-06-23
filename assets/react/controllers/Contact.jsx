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
import imgContact from '../../../public/Image/dieteContact.jpg'
import '../../../public/assets/css/styleReact.css';





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
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [open, setOpen] = useState(false);

    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+$/;


    function handlePhoneChange(event) {
        const phoneValue = event.target.value;
        setPhone(phoneValue);
        if (!phoneRegex.test(phoneValue)) {
            setPhoneError('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
        } else {
            setPhoneError('');
        }
    }
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        setDescriptionError('');
    }
    function handleEmailChange(event) {
        const emailValue = event.target.value;
        setEmail(emailValue);
        if (!emailRegex.test(emailValue)) {
            setEmailError('Veuillez entrer une adresse e-mail valide.');
        } else {
            setEmailError('');
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
        const nameValue = event.target.value;
        setName(nameValue);
        if (!nameRegex.test(nameValue)) {
            setNameError('Veuillez entrer un nom valide (lettres alphabétiques uniquement).');
        } else {
            setNameError('');
        }
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
        if(!phone) {
            setPhoneError('Entrez votre numéro de tel')
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
                description: description,
                number: phone
            }).then(response => {
                // Réinitialiser les valeurs des champs
                setEmail('');
                setName('');
                setObjet('');
                setDescription('');
                setPhone('');
            }).catch(error => {
                // Gérer les erreurs
                console.error(error);
            });



        }

    }


    return(
        <div id="contact-react">
            <div id="title-contact">
                <h2>Contactez-moi</h2>
            </div>
            <div id="contact-container">
                <div id="imgContact">
                    <img src={imgContact} alt="contact-img" />
                </div>
                <div id="contact">
                    {!formSubmitted && (
                        <form id="form-contact">
                            <div className="container-contact">
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', '& > :not(style)': { m: 1 } }}>

                                    <TextField
                                        helperText="Please enter your email"
                                        id="email-input"
                                        label="E-mail"
                                        value={email}
                                        onChange={handleEmailChange}
                                        error={Boolean(emailError)}
                                        pattern="^\S+@\S+\.\S+$"
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', '& > :not(style)': { m: 1 } }}>
                                    <TextField
                                        helperText="Please enter your name"
                                        id="name-input"
                                        label="Name"
                                        value={name}
                                        onChange={handleNameChange}
                                        error={Boolean(nameError)}
                                        inputProps={{ pattern: nameRegex.source }}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', '& > :not(style)': { m: 1 } }}>
                                    <TextField
                                        helperText="Please enter your number phone"
                                        id="phone-input"
                                        label="Phone Number"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        error={Boolean(phoneError)}
                                        pattern="^\d{10}$"
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', '& > :not(style)': { m: 1 } }}>
                                    <TextField
                                        helperText="Please enter the subject"
                                        id="objet-input"
                                        label="Objet"
                                        value={objet}
                                        onChange={handleObjetChange}
                                        fullWidth
                                    />
                                </Box>
                                {objetError && (
                                    <Typography variant="caption" color="error">
                                        {objetError}
                                    </Typography>
                                )}
                                <Box sx={{ '& > :not(style)': { m: 1 }, width: '80%' }} className="description-contact">
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
                                <Box sx={{ '& > :not(style)': { m: 1 }, width: '80%'}} id="button">
                                    <Button variant="contained" onClick={handleSubmit} id="submit-button">
                                        Envoyez mon message
                                    </Button>
                                </Box>
                            </div>
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
            </div>
        </div>

    );
}