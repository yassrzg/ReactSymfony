import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


    // ICON RATING

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}


IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};





    // ALERT

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function HoverRating({ recetteId }) {
    const [value, setValue] = useState(null);
    const [comment, setComment] = useState('');
    const [showButton, setShowButton] = useState(true);
    const [ratingError, setRatingError] = useState('');
    const [commentError, setCommentError] = useState('');
    const [submittedRating, setSubmittedRating] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [avis, setAvis] = useState([]);
    const [open, setOpen] = useState(false);

    // JE RÉCUPÈRE LA DATA DE TOUS LES AVIS AVEC MON AXIOS GET

    useEffect(() => {
        axios
            .get(`/api/getAvis/${recetteId}`)
            .then((response) => {
                setAvis(response.data);
                console.log(avis);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // JE FILTRE LES AVIS SELON L'ID DE LA RECETTE QUE JE RÉCUPÈRE EN PROPS
    // function getAvisByRecetteId(recetteId) {
    //     return avis.filter((avisItem) => avisItem.AvisRecette && avisItem.AvisRecette.id === recetteId);
    // }

    // J'ATTRIBUE UNE NOUVELLE DATA À LA SELECTION DE MES ÉTOILES POUR NOTIFIER L'AVIS

    function handleRatingChange(event, newValue) {
        event.preventDefault();
        setValue(newValue);
        setRatingError('');
    }

    // JE RÉCUPÈRE LA DATA DU COMMENTAIRE

    function handleCommentChange(event) {
        setComment(event.target.value);
        setCommentError('');
    }

    // FERMER LA NOTIFICATION

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };

    // JE VÉRIFIE QUE LA NOTE ET LE COMMENTAIRE ON ÉTAIT QUANTIFIÉ AVANT DE SUBMIT LE FORM

    function handleSubmit(e) {
        if (!value) {
            setRatingError('Vous devez attribuer une note.');
            return;
        }

        if (!comment) {
            setCommentError('Vous devez écrire un commentaire.');
            return;
        }
        if(comment && value) {
            e.preventDefault();

            setShowButton(false);
            setFormSubmitted(true);
            setOpen(true);

            axios
                .post(`/account/recette_patient/${recetteId}`, {
                    recetteId: recetteId,
                    note: value,
                    description: comment,


                })
                .then((response) => {
                    const newAvis = {
                        id: recetteId,
                        Note: value,
                        Description: comment,


                    };

                    setAvis((prevAvis) => [...prevAvis, newAvis]);
                    setSubmittedRating(value);

                    setValue(null);
                    setComment('');
                    setShowButton(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    // LORS DU SUBMIT JE RÉCUPÈRE UNE NOUVELLE FOIS L'ID DE LA RECETTE SELON L'AVIS

    function getAvisByRecetteId() {
        return avis;
    }


    // const avisByRecette = getAvisByRecetteId(recetteId);

    return (
        <div>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {!formSubmitted &&  (
                    <Rating
                        value={value ? value : 1}
                        precision={0.5}
                        onChange={handleRatingChange}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                )}
                {ratingError && (
                    <Typography variant="caption" color="error">
                        {ratingError}
                    </Typography>
                )}
                <Box sx={{ mt: 2, width: '100%' }}>
                    {!formSubmitted && (
                        <TextField
                            label="Commentaire"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={comment}
                            onChange={handleCommentChange}
                            fullWidth
                        />
                    )}
                </Box>
                {commentError && (
                    <Typography variant="caption" color="error">
                        {commentError}
                    </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                    {showButton && !formSubmitted && (
                        <Button variant="contained" onClick={handleSubmit}>
                            Soumettre l'avis
                        </Button>
                    )}
                </Box>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
                        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                            Merci d'avoir donné votre avis!
                        </Alert>
                    </Snackbar>
                </Stack>
            </Box>
            <div>
                {avis.map((avisItem) => (
                    <div key={avisItem.id} className="avis-item">
                        <StyledRating
                            name="highlight-selected-only"
                            value={avisItem.Note}
                            IconContainerComponent={IconContainer}
                            readOnly
                        />
                        <p> {avisItem.Description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
