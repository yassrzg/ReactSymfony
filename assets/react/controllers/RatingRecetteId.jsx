import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import * as React from "react";
import '../../../public/assets/css/styleReact.css';




export default function RatingRecetteId ({noteUser}) {

    return(
        <div className="note">
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="text-feedback"
                    value={noteUser}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />



            </Box>
            <div>

            </div>
        </div>
    )
}