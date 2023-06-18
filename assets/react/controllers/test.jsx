import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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


    function handleRatingChange(event, newValue) {
        event.preventDefault();
        setValue(newValue);
    }

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function handleSubmit() {
        axios
            .post(`https://127.0.0.1:8000/account/recette_patient/${recetteId}`, {
                note: value,
                description: comment,
            })
            .then((response) => {
                const jsonData = response.data;
                console.log(jsonData);
                // Faites quelque chose avec la réponse si nécessaire
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Rating
                value={value ? value : 1}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={handleRatingChange}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ mt: 2 }}>
                <TextField
                    label="Commentaire"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                />
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleSubmit}>
                    Soumettre l'avis
                </Button>
            </Box>
        </Box>
    );
}
