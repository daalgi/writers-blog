import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import WriterCard from './WriterCard'
import Writer from './Writer'
import { NotFound } from '../Errors'


export default ({ match: { url }, writers }) =>
    <Fragment>
        <h1>Writers</h1>
        <Grid container spacing={8}>
            {writers.map(writer =>
                <WriterCard url={ url } key={ writer.id } {...writer} />        )
            }
        </Grid>
    </Fragment>