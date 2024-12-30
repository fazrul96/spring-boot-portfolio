import React from "react";
import {Card, CardMedia} from "@mui/material";

const WebtoonHeader = ({ webtoon }) => {
    return (
        <Card sx={{ display: 'flex', mb: 4, borderRadius: 2, boxShadow: 3, width: '100%' }}>
            <CardMedia
                component="img"
                sx={{
                    height: 300,
                    width: '100%',
                    backgroundImage: `url(${webtoon?.bannerImage || webtoon?.coverImage})`,
                }}
            />
        </Card>
    );
};

export default WebtoonHeader