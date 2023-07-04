
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
import Modal from '@mui/material/Modal';



import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';




    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

export default function Account() {

    const [value, setValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
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

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [open, setOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const surnameRegex = /^[a-zA-Z]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*()])/;


    const [selectedRegimes, setSelectedRegimes] = useState([]);
    const [selectedAllergies, setSelectedAllergies] = useState([]);



    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);





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
        setConfirmValue(event.target.value);
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

        if (!passwordRegex.test(value)) {
            setFormSubmitted(false);
            setOpen(true);
            return;
        }
        if (value !== confirmValue) {
            setFormSubmitted(false);
            setOpen(true);
            return;
        }

        if(email && name ) {
            setOpen(true);

            axios.post('/api/setNewDataUser', {
                email: email,
                name: name,
                surname: surname,
                password: value,
                number: phone,
            }).then(response => {
                // Réinitialiser les valeurs des champs
                setEmail('');
                setName('');
                setSurname('');
                setValue('');
                setPhone('');
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
            <div id="modal-account">
                <Button onClick={handleOpenModal}>Changer mes données personnelles</Button>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h2>Mes Données</h2>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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


                                    <Box sx={{ '& > :not(style)': { m: 1 }, width: '80%'}} id="button">
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
                        Donnée enregistré
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}