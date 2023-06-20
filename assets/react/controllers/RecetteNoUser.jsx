import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {useEffect, useState} from "react";
import axios from "axios";
import '../../../public/assets/css/styleReact.css';
import sablierImage from '../../../public/Image/icons-sablier.png';
import minuteurImage from '../../../public/Image/icons-minuteur.png';
import attentionImage from '../../../public/Image/icons-attention.png';

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

export default function RecetteNoUser() {

    const [recettes, setRecettes] = useState([]);
    useEffect(() => {
        axios.get('https://127.0.0.1:8000/api/getRecetteNoUser')
            .then(response => {
                setRecettes(response.data.recettes)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const value = 3;
    return (

            <div id="container-Recette">
                {recettes.map((recette) => (
                    <div key={recette.id} className="containerRecette">
                        <div className="container-img">
                            <img src={`/Uploads/${recette.imageRecette}`} alt="Recette" className="imgRecette"/>
                        </div>
                        <div className="container-description">
                            <h2>{recette.titre}</h2>
                            <div className="container-time">
                                <div className="time">
                                    <img src={sablierImage} alt="iconSablier" />
                                    <p>Préparation:</p>
                                    <p>{new Date(recette.tempsPreparation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} heure</p>
                                </div>
                                <div className="time">
                                    <img src={minuteurImage} alt="minuteurImage" />
                                    <p>Cuisson:</p>
                                    <p>{new Date(recette.tempsCuisson).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} heure</p>
                                </div>
                            </div>
                            <div className="allergie">
                                <img src={attentionImage} alt="iconAttention" />
                                <p>ALLERGIE</p>
                            </div>

                            <div className="container-allergie">
                                {recette.Allergie.map((allergie) => (
                                    <p key={allergie.id}>{allergie.name}</p>
                                ))}
                            </div>
                            <div className="note">
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
                                        <p className="padding1">Pas encore de note</p>
                                    )}
                                </Box>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


    );
}
