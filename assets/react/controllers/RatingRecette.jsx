import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'; // Import Typography component
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

export default function HoverRating({ recetteId, avis }) {
    const [value, setValue] = useState(null);
    const [comment, setComment] = useState('');
    const [showButton, setShowButton] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [ratingError, setRatingError] = useState('');
    const [commentError, setCommentError] = useState('');
    const [submittedRating, setSubmittedRating] = useState(null); // Nouvel état pour stocker la note enregistrée
    const [formSubmitted, setFormSubmitted] = useState(false); // Nouvel état pour contrôler la visibilité du formulaire

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
        if (value && comment) {
            // Hide the button
            setShowButton(false);
            setFormSubmitted(true); // Marquer le formulaire comme soumis

            // Send the rating and comment to the server
            axios
                .post(`https://127.0.0.1:8000/account/recette_patient/${recetteId}`, {
                    note: value,
                    description: comment,
                })
                .then((response) => {
                    const jsonData = response.data;
                    console.log(jsonData);
                    // Show the modal
                    setShowModal(true);

                    // AJOUTER
                    setSubmittedRating(value);
                    // Simulate clearing the form and resetting the states
                    setTimeout(() => {
                        setValue(null);
                        setComment('');
                        setShowButton(true);
                        setShowModal(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

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
                {submittedRating !== null ? ( // Vérifiez si une note a été soumise
                    <Rating
                        value={submittedRating}
                        readOnly // Rendre la note en lecture seule
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
                    {!formSubmitted && ( // Cacher le composant TextField si le formulaire a été soumis
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
                    <div key={avisItem.id} className="avis-item">
                        <div className="note">
                            <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Rating
                                    name={`rating-${avisItem.id}`}
                                    value={avisItem.Note}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Box sx={{ ml: 2 }}>{labels[avisItem.Note]}</Box>
                            </Box>
                        </div>
                        <div className="description">
                            <p>{avisItem.Description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
