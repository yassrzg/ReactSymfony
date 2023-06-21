import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import * as React from "react";
import '../../../public/assets/css/styleReact.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";


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


export default function RatingRecetteId ({ recetteId }) {

    const [avis, setAvis] = useState([]);

    useEffect(() => {
        axios
            .get('/api/getAvis')
            .then((response) => {
                setAvis(response.data);
                console.log(avis);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const avisByRecette = getAvisByRecetteId(recetteId);
    }, [avis, recetteId]);

    const avisByRecette = getAvisByRecetteId(recetteId);

    function getAvisByRecetteId(recetteId) {
        return avis.filter((avisItem) => avisItem.AvisRecette && avisItem.AvisRecette.id === recetteId);
    }

    return(
        <div>
            {avis.map((avisItem) => (
                <div key={recetteId} className="avis-item">
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
    )
}