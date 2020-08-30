import React from 'react'
import { Container } from './styles'

const Detail = ({ comic }) => {
  return (
    <Container>
      <div>
        <strong>{comic.title}</strong>
      </div>
      <div>
        {comic.description || 'No description'}
      </div>
    </Container>
  )
}

export default Detail
