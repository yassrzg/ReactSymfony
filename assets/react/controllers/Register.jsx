import { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import imgSignin from '../../../public/Image/logo.png'
import '../../../public/assets/css/styleReact.css';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import {Password} from "primereact/password";





// ALERT

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Contact() {



    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');

    const [allergie, setAllergie] = useState([]);
    const [regime, setRegime] = useState([]);

    const [open, setOpen] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;
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
        if (!passwordRegex.test(password)) {
            setPasswordError('Veuillez utiliser des caractères spéciaux et 8 carractère minimum');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError('Les mots de passe ne correspondent pas');
            return;
        }


        if(email && name && phone && password ) {
            setOpen(true);

            axios.post('/api/setUser', {
                email: email,
                name: name,
                surname: surname,
                password: password,
                number: phone,
                allergie: selectedAllergies,
                regime: selectedRegimes,
            }).then(response => {
                // Réinitialiser les valeurs des champs
                setEmail('');
                setName('');
                setSurname('');
                setPassword('');
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
        <div id="register-react">
            <div id="title-register">
                <h2>Inscrire un patient</h2>
                <div id="imgSignin">
                    <img src={imgSignin} alt="contact-img" />
                </div>
            </div>
                <form id="form-register">
                    <div className="register1">
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
                    </div>
                    <div className="register2">
                        <div className="password-register">
                                         <span className="p-float-label password-container-register">
                                            <Password
                                                inputId="password-Register"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                toggleMask
                                            />
                                            <label htmlFor="password">Password</label>
                                         </span>
                        </div>
                        <div className="confirmPassword-register">
                                        <span className="p-float-label confirmPassword-container-register">
                                            <Password
                                                inputId="confirm-password-Register"
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
                        <div id="react-allergie-regime-register">
                            <FormControl>
                                <FormLabel component="legend" className="label">Allergies</FormLabel>
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
                                <FormLabel id="label" className="label">Régimes</FormLabel>
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
                    </div>

                    <Box sx={{ '& > :not(style)': { m: 1 }, width: '80%'}} id="button-register">
                        <Button variant="contained" onClick={handleSubmit} id="submit-button">
                            Inscrire le patient
                        </Button>
                    </Box>

                </form>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                        Inscription reussi !
                    </Alert>
                </Snackbar>
            </Stack>
        </div>

    );
}