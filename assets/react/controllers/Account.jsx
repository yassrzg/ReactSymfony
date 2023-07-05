
import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHandDots } from '@fortawesome/free-solid-svg-icons';


import '../../../public/assets/css/styleReact.css';
import Modal from '@mui/material/Modal';






    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


export default function Account() {


    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');

    const [open, setOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const surnameRegex = /^[a-zA-Z]+$/;


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
            setNameError('Entrez votre prénoms.');
            return;
        }
        if (!surname) {
            setSurnameError('Entrez votre noms.');
            return;
        }
        if(!phone) {
            setPhoneError('Entrez votre numéro de tel')
        }


        if(email && name && surname && phone ) {
            setOpen(true);

            axios.post('/api/setNewDataUser', {
                email: email,
                name: name,
                surname: surname,
                number: phone,
            }).then(response => {
                // Réinitialiser les valeurs des champs
                setEmail('');
                setName('');
                setSurname('');
                setPhone('');
            }).catch(error => {
                // Gérer les erreurs
                console.error(error);
            });



        }

    }

    return(
        <div id="page-account">
            <div id="modal-account">
                <Button onClick={handleOpenModal}>Changer mes données personnelles</Button>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box id="box-modal">



                        <form id="form-account">
                            <div className="title-setting-account">
                                <h4>Changer mon mot de passe</h4>
                            </div>
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


                                <Box sx={{ '& > :not(style)': { m: 1 }, width: '100%'}} id="button-setting">
                                    <Button variant="contained" onClick={handleSubmit} id="submit-button-account">
                                        Sauvegarder
                                    </Button>
                                    <Button variant="contained" onClick={handleCloseModal} id="close-button">
                                        fermer
                                    </Button>
                                </Box>
                            </div>
                        </form>

                    </Box>
                </Modal>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity="succsubmit-button-accountess" sx={{ width: '100%' }}>
                        Donnée enregistré
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}