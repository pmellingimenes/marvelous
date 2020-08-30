import React from 'react'
import Comic from '../Comic'
import Grid from '@material-ui/core/Grid'
import { Container } from './styles'
const ComicsList = ({ comics }) => {
  return (
    <Container>
      <Grid container spacing={10}>
        {comics.map((comic) => (
          <Grid key={comic.id} item>
            <Comic comic={comic} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ComicsList
