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
import imgSignin from '../../../public/Image/logo.png'
import '../../../public/assets/css/styleReact.css';

import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import Key from '@mui/icons-material/Key';





// ALERT

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Contact() {

    const [value, setValue] = useState('');
    const minLength = 12;

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
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');

    const [allergie, setAllergie] = useState([]);
    const [regime, setRegime] = useState([]);

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [open, setOpen] = useState(false);



    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const surnameRegex = /^[a-zA-Z]+$/;


    const [selectedRegimes, setSelectedRegimes] = useState([]);
    const [selectedAllergies, setSelectedAllergies] = useState([]);

    const handleAllergieChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedAllergies((prevSelectedAllergies) => [...prevSelectedAllergies, value]);
        } else {
            setSelectedAllergies((prevSelectedAllergies) =>
                prevSelectedAllergies.filter((allergie) => allergie !== value)
            );
        }
    };

    const handleRegimeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedRegimes((prevSelectedRegimes) => [...prevSelectedRegimes, value]);
        } else {
            setSelectedRegimes((prevSelectedRegimes) =>
                prevSelectedRegimes.filter((regime) => regime !== value)
            );
        }
    };


    function handleSurnameChange(event) {
        const surnameValue = event.target.value;
        setSurname(surnameValue);
        if (!surnameRegex.test(surnameValue)) {
            setSurnameError('Veuillez entrer un nom valide (lettres alphabétiques uniquement).');
        } else {
            setSurnameError('');
        }
    }

    function handlePhoneChange(event) {
        const phoneValue = event.target.value;
        setPhone(phoneValue);
        if (!phoneRegex.test(phoneValue)) {
            setPhoneError('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
        } else {
            setPhoneError('');
        }
    }

    /* GET */

    useEffect(() => {
        axios
            .get(`/api/getAllergie`)
            .then((response) => {
                setAllergie(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`/api/getRegime`)
            .then((response) => {
                setRegime(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };

    // SUBMIT

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


        if(email && name ) {
            setFormSubmitted(true);
            setOpen(true);

            axios.post('/api/setUser', {
                email: email,
                name: name,
                surname: surname,
                password: value,
                number: phone,
                allergie: selectedAllergies,
                regime: selectedRegimes,
            }).then(response => {
                // Réinitialiser les valeurs des champs
                setEmail('');
                setName('');
                setSurname('');
                setValue('');
                setPhone('');
                setSelectedAllergies([]);
                setSelectedRegimes([]);
            }).catch(error => {
                // Gérer les erreurs
                console.error(error);
            });



        }

    }


    return(
        <div id="login-react">
            <div id="title-contact">
                <h2>Inscrire un Patient</h2>
            </div>
            <div id="contact-container">
                <div id="imgSignin">
                    <img src={imgSignin} alt="contact-img" />
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
                                        label="Prénom"
                                        value={name}
                                        onChange={handleNameChange}
                                        error={Boolean(nameError)}
                                        inputProps={{ pattern: nameRegex.source }}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', '& > :not(style)': { m: 1 } }}>
                                    <TextField
                                        helperText="Please enter your surname"
                                        id="surname-input"
                                        label="Nom"
                                        value={surname}
                                        onChange={handleSurnameChange}
                                        error={Boolean(surnameError)}
                                        inputProps={{ pattern: surnameRegex.source }}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', '& > :not(style)': { m: 1 } }}>
                                    <TextField
                                        helperText="Please enter your number phone"
                                        id="phone-input"
                                        label="Téléphone"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        error={Boolean(phoneError)}
                                        pattern="^\d{10}$"
                                        fullWidth
                                    />
                                </Box>
                                <Stack
                                    spacing={0.5}
                                    sx={{
                                        '--hue': Math.min(value.length * 10, 120),
                                    }}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Type in here…"
                                        startDecorator={<Key />}
                                        value={value}
                                        onChange={(event) => setValue(event.target.value)}
                                    />
                                    <LinearProgress
                                        determinate
                                        size="sm"
                                        value={Math.min((value.length * 100) / minLength, 100)}
                                        sx={{
                                            bgcolor: 'background.level3',
                                            color: 'hsl(var(--hue) 80% 40%)',
                                        }}
                                    />
                                    <Typography
                                        level="body3"
                                        sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
                                    >
                                        {value.length < 3 && 'Very weak'}
                                        {value.length >= 3 && value.length < 6 && 'Weak'}
                                        {value.length >= 6 && value.length < 10 && 'Strong'}
                                        {value.length >= 10 && 'Very strong'}
                                        {!/^[a-zA-Z0-9]*$/.test(value) && ' - Must contain special characters'}
                                    </Typography>
                                </Stack>
                                <div id="react-allergie-regime">
                                <FormControl>
                                    <FormLabel component="legend" className="label">Allergie</FormLabel>
                                    <div id="checkbox1">
                                    {allergie.map((allergieItem) => (
                                        <FormControlLabel
                                            key={allergieItem.id}
                                            control={
                                            <Checkbox
                                                value={allergieItem.name}
                                                checked={selectedAllergies.includes(allergieItem.name)}
                                                onChange={handleAllergieChange}
                                                color="primary"
                                            />
                                        }
                                            label={allergieItem.name}
                                        />
                                    ))}
                                    </div>
                                </FormControl>
                                <FormControl>
                                    <FormLabel id="label" className="label">Régime</FormLabel>
                                    <div id="checkbox">
                                    {regime.map((regimeItem) => (
                                        <FormControlLabel
                                            key={regimeItem.id}
                                            control={
                                                <Checkbox
                                                    value={regimeItem.name}
                                                    checked={selectedRegimes.includes(regimeItem.name)}
                                                    onChange={handleRegimeChange}
                                                    color="primary"
                                                />
                                            }
                                            label={regimeItem.name}
                                        />
                                    ))}
                                    </div>
                                </FormControl>
                                </div>

                                <Box sx={{ '& > :not(style)': { m: 1 }, width: '80%'}} id="button">
                                    <Button variant="contained" onClick={handleSubmit} id="submit-button">
                                        Inscrire
                                    </Button>
                                </Box>
                            </div>
                        </form>
                    )}
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                            <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                                Inscription reussi
                            </Alert>
                        </Snackbar>
                    </Stack>
                </div>
            </div>
        </div>

    );
}