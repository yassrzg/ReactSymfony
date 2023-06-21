import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ recetteId }) {
    const [value, setValue] = useState(null);
    const [comment, setComment] = useState('');
    const [showButton, setShowButton] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [ratingError, setRatingError] = useState('');
    const [commentError, setCommentError] = useState('');
    const [submittedRating, setSubmittedRating] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [avis, setAvis] = useState([]);

    useEffect(() => {
        axios
            .get('https://127.0.0.1:8000/api/getAvis')
            .then((response) => {
                setAvis(response.data);
                console.log(avis);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function getAvisByRecetteId(recetteId) {
        return avis.filter((avisItem) => avisItem.AvisRecette && avisItem.AvisRecette.id === recetteId);
    }


    function handleRatingChange(event, newValue) {
        event.preventDefault();
        setValue(newValue);
        setRatingError('');
    }

    function handleCommentChange(event) {
        setComment(event.target.value);
        setCommentError('');
    }

    function handleSubmit() {
        if (!value) {
            setRatingError('Vous devez attribuer une note.');
            return;
        }

        if (!comment) {
            setCommentError('Vous devez écrire un commentaire.');
            return;
        }

        setShowButton(false);
        setFormSubmitted(true);

        axios
            .post(`https://127.0.0.1:8000/account/recette_patient/${recetteId}`, {
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

                setShowModal(true);

                setValue(null);
                setComment('');
                setShowButton(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        const avisByRecette = getAvisByRecetteId(recetteId);
    }, [avis, recetteId]);


    const avisByRecette = getAvisByRecetteId(recetteId);

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
                {submittedRating !== null ? (
                    <Rating
                        value={submittedRating}
                        readOnly
                        precision={0.5}
                        getLabelText={getLabelText}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                ) : (
                    <Rating
                        value={value ? value : 1}
                        precision={0.5}
                        getLabelText={getLabelText}
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
                <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography id="modal-title" variant="h6" component="h2">
                            Votre avis a bien été envoyé
                        </Typography>
                    </Box>
                </Modal>
            </Box>
            <div>
                {avis.map((avisItem) => (
                    <div key={recetteId} className="avis-item">
                        <p>Note: {avisItem.Note}</p>
                        <p>Description: {avisItem.Description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
