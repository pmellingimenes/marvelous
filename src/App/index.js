import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ComicsPage from '../ComicsPage'
import CharactersPage from '../CharactersPage'
import ApiKeysForm from '../ApiKeysForm'
import { Container } from './styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../TabPanel'
import { getMarvelApiAuthParams } from '../utils'
import CircularProgress from '@material-ui/core/CircularProgress'

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const apiKeyFromStorage = JSON.parse(window.localStorage.getItem('marvelApiKeys') || '{}')

const App = () => {
  const [value, setValue] = useState(0)
  const [marvelApiKeys, setMarvelApiKeys] = useState({
    publicKey: apiKeyFromStorage.publicKey,
    privateKey: apiKeyFromStorage.privateKey
  })

  const [isApiKeysValid, setIsApiKeysValid] = useState(false)
  const [validatingApiKeys, setValidatingApiKeys] = useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setValidatingApiKeys(true)
    const authParams = getMarvelApiAuthParams({ privateKey: marvelApiKeys.privateKey, publicKey: marvelApiKeys.publicKey })
    axios.get(`/characters?${authParams}&limit=1`)
      .then(() => {
        setValidatingApiKeys(false)
        setIsApiKeysValid(true)
      })
      .catch(() => {
        setValidatingApiKeys(false)
        setIsApiKeysValid(false)
      })
  }, [marvelApiKeys])

  const getContent = () => {
    if (validatingApiKeys) {
      return (
        <>
          <h3>API Keys validation</h3>
          <CircularProgress />
        </>

      )
    } else if (isApiKeysValid) {
      return (
        <>
          <AppBar position='static'>
            <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
              <Tab label='Comics' {...a11yProps(0)} />
              <Tab label='Characters' {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ComicsPage marvelApiKeys={marvelApiKeys} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CharactersPage marvelApiKeys={marvelApiKeys} />
          </TabPanel>
        </>
      )
    } else {
      return (
        <>
          <h3>API Key Invalid or not configurated</h3>
          <ApiKeysForm onSubmit={setMarvelApiKeys} />
        </>
      )
    }
  }

  return (
    <Container>
      {getContent()}
    </Container>
  )
}

export default App
