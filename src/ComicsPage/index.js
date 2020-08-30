import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { getMarvelApiAuthParams } from '../utils'
import ComicsList from '../ComicsList'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Button } from '@material-ui/core'
import { Container } from './styles'

const ComicsPage = ({ marvelApiKeys }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])
  const [offset, setOffset] = useState(0)
  const limit = useMemo(() => 20, [])

  const requestComics = () => {
    setIsLoading(true)
    const authParams = getMarvelApiAuthParams({ privateKey: marvelApiKeys.privateKey, publicKey: marvelApiKeys.publicKey })
    axios.get(`/comics?${authParams}&limit=${limit}&offset=${offset}`)
      .then(res => {
        setIsLoading(false)
        setResults(res.data.data.results)
      })
  }

  useEffect(() => {
    requestComics()
  }, [offset])

  if (isLoading) {
    return (
      <>
        <div>Loading comics...</div>
        <CircularProgress />
      </>
    )
  }

  return (
    <Container>
      <ComicsList comics={results} />
      <Button onClick={() => setOffset(limit + offset)} variant='contained' color='primary'>
        Next comics page
      </Button>
    </Container>
  )
}

export default ComicsPage
