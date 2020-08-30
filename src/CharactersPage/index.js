import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getMarvelApiAuthParams } from '../utils'

const CharactersPage = ({ marvelApiKeys }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (searchTerm.trim()) {
      setIsLoading(true)
      const authParams = getMarvelApiAuthParams({ privateKey: marvelApiKeys.privateKey, publicKey: marvelApiKeys.publicKey })
      axios.get(`/characters?${authParams}&name=${searchTerm}`)
        .then(res => {
          setIsLoading(false)
          setResults(res.data.data.results)
        })
    } else {
      setIsLoading(false)
    }
  }, [searchTerm])

  const getResults = () => {
    if (isLoading) {
      return <CircularProgress />
    }
    return (
      <>
        {results.map(character => (
          <div key={character.id}>
            <h3>{character.name}</h3>
            <img src={`${character.thumbnail.path}/portrait_small.${character.thumbnail.extension}`} />
          </div>
        ))}

      </>
    )
  }

  return (
    <>
      <h2>Search characters</h2>
      <TextField
        value={searchTerm}
        onChange={(evt) => setSearchTerm(evt.target.value)}
        id='standard-basic'
        label='Search characters'
      />
      <h2>Results</h2>
      {getResults()}
    </>
  )
}

export default CharactersPage
