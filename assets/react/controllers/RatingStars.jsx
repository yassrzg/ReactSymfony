import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {useEffect, useState} from "react";
import axios from "axios";

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
    7: 'SUper'
};

export default function TextRating() {

    const [recettes, setRecettes] = useState([]);
    useEffect(() => {
        axios.get('https://127.0.0.1:8000/api/getUser')
            .then(response => {
                setRecettes(response.data.recettes)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    // const element = document.querySelector('[data-react-component="RatingStars"]');
    // const moyenne = parseFloat(element.getAttribute('data-moyenne'));
    // const value = moyenne; // Utiliser la moyenne passée en prop
    // console.log(value);
    const value = 3;
    return (
        <div>
            <div>
                {recettes.map((recette) => (
                    <div key={recette.id}>
                        <p>Titre: {recette.titre}</p>
                        <p>Description: {recette.description.replace(/<[^>]+>/g, '')}</p>
                        <p>Temps de préparation: {new Date(recette.tempsPreparation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} heure</p>
                        <p>Temps de repos: {new Date(recette.tempsRepos).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} heure</p>
                        <p>Temps de cuisson: {new Date(recette.tempsCuisson).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} heure</p>
                        <p>Ingrédients: {recette.Ingredients}</p>
                        <p>Étapes: {recette.Etapes}</p>
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {recette.NoteMoyenne ? (
                                <>
                                    <Rating
                                        name="text-feedback"
                                        value={recette.NoteMoyenne}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />

                                    <Box sx={{ ml: 2 }}>{labels[recette.NoteMoyenne]}</Box>
                                </>
                                ) : (
                                    <p>Pas encore de note</p>
                                )}
                        </Box>
                    </div>
                ))}
            </div>

        </div>
    );
}
