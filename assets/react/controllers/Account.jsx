
import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Input from "@mui/joy/Input";
import Key from "@mui/icons-material/Key";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHandDots } from '@fortawesome/free-solid-svg-icons';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import '../../../public/assets/css/styleReact.css';



import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';


    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
export default function Account() {

    const [value, setValue] = useState('');
    const minLength = 12;



    const [user, setUser] = useState([]);
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

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [showElements, setShowElements] = useState(false);



    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const surnameRegex = /^[a-zA-Z]+$/;


    const [selectedRegimes, setSelectedRegimes] = useState([]);
    const [selectedAllergies, setSelectedAllergies] = useState([]);


    const handleButtonClick = () => {
        setShowElements(!showElements);
    };

    const handleAllergieChange = (event) => {
        const { value, checked } = event.target;
        setSelectedAllergies((prevSelectedAllergies) => {
            if (checked) {
                // Ajouter la valeur à la liste des allergies sélectionnées si elle n'est pas déjà présente
                if (!prevSelectedAllergies.includes(value)) {
                    return [...prevSelectedAllergies, value];
                }
            } else {
                // Supprimer la valeur de la liste des allergies sélectionnées
                return prevSelectedAllergies.filter((allergie) => allergie !== value);
            }
            return prevSelectedAllergies;
        });
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

    useEffect(() => {
        axios
            .get(`/api/getUser`)
            .then((response) => {
                // setUser(response.data);
                const userData = response.data;
                setUser(userData);
                setEmail(userData.email || '');
                setName(userData.firstname || '');
                setSurname(userData.lastname || '');
                setValue(userData.password);
                setPhone(userData.phoneNumber || '');
                setSelectedAllergies(userData.AllergieUser || []);
                setSelectedRegimes(userData.RegimeUser || []);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


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

            axios.post('/api/setNewDataUser', {
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
        <div id="page-account">
            <div id="account-title">
                <h2>Mes Données</h2>
            </div>
            {!formSubmitted && (
                <form id="form-account">
                    <div className="container-contact">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', '& > :not(style)': { m: 1 } }}>

                            <TextField
                                color="secondary"
                                focused
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
                                color="secondary"
                                focused
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
                                color="secondary"
                                focused
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
                                color="secondary"
                                focused
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
                                placeholder="Entrez votre mot de passe"
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
                        <div id="data-account">
                            <div id="regime-data">
                                <FontAwesomeIcon icon={faUtensils} />
                                <p>{selectedRegimes}</p>
                            </div>
                            <div id="allergie-data">
                                <FontAwesomeIcon icon={faHandDots} />
                                <p>{selectedAllergies}</p>
                            </div>
                        </div>
                        <Stack direction="row" spacing={2} id="button-account">
                            <ColorButton
                                variant="contained"
                                onClick={handleButtonClick}
                            >Changer mes allergies & régimes</ColorButton>
                        </Stack>

                        {showElements && (
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
                        )}

                        <Box sx={{ '& > :not(style)': { m: 1 }, width: '80%'}} id="button">
                            <Button variant="contained" onClick={handleSubmit} id="submit-button">
                                Sauvegarder
                            </Button>
                        </Box>
                    </div>
                </form>
            )}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                        Donnée enregistré
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}