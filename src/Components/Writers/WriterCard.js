import React from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardActionArea, CardMedia, CardContent, CardActions,
    Typography, makeStyles
} from '@material-ui/core'


const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: 8,
        textDecoration: 'none'
    },
    media: {
        height: 140,
    },
})


export default ({ url, id, name, born, deceased, image }) => {
    const classes = useStyles();

    return (
        <Card className={ classes.card } to={ `${url}/${id}` } component={ Link }>
            <CardActionArea>
                <CardMedia
                    className={ classes.media }
                    image={ image }
                    title={ name }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        { name }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { born } &mdash; { deceased }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

/*
<Card className={classes.card} to={`${url}/${id}`} component={ Link }>
*/