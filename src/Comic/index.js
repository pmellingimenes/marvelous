import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import {
  Container,
  TitleSection,
  Title,
  Thumbnail,
  DetailSection,
  ImageSection,
  Image,
  ImagePlaceholder,
  Authors
} from './styles'
import Paper from '@material-ui/core/Paper'
import { isEmpty, first } from 'lodash'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Detail from './Detail'

const Comic = ({ comic }) => {
  const [isDetailsOpened, setIsDetailsOpened] = useState(false)

  const getImage = () => {
    if (isEmpty(comic.images)) {
      return (
        <ImagePlaceholder>
          No Image!
        </ImagePlaceholder>
      )
    } else {
      const imageData = first(comic.images)
      return (
        <Image src={`${imageData.path}/portrait_fantastic.${imageData.extension}`} />
      )
    }
  }

  const getAuthorsName = () => {
    if (comic.creators && comic.creators.items) {
      return comic.creators.items.map(item => item.name).join(', ')
    }
  }

  const toggleDrawer = () => {
    setIsDetailsOpened(!isDetailsOpened)
  }

  return (
    <Paper>
      <Container>
        <TitleSection>
          <Thumbnail src={`${comic.thumbnail.path}/portrait_small.${comic.thumbnail.extension}`} />
          <Title>{comic.title}</Title>
        </TitleSection>
        <DetailSection>
          <ImageSection>
            {getImage()}
          </ImageSection>
          <Authors>
            <strong>Authors: </strong>
            {getAuthorsName() || 'No authors available'}
          </Authors>
        </DetailSection>
        <Button onClick={toggleDrawer} variant='contained' color='primary'>See details</Button>
        <SwipeableDrawer onClose={toggleDrawer} open={isDetailsOpened}>
          <Detail comic={comic} />
        </SwipeableDrawer>
      </Container>
    </Paper>
  )
}

export default Comic
