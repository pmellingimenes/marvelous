import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { Button } from '@material-ui/core'
import { FormRow } from './styles'

const ApiKeysForm = ({ onSubmit }) => {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const handleFormSubmit = (evt) => {
    evt.preventDefault()
    onSubmit({
      publicKey,
      privateKey
    })
    window.localStorage.setItem('marvelApiKeys', JSON.stringify(
      {
        publicKey,
        privateKey
      }
    ))
  }

  return (
    <form onSubmit={handleFormSubmit} noValidate autoComplete='off'>
      <h3>Configure to proceed</h3>
      <FormRow>
        <FormControl>
          <InputLabel htmlFor='public-key'>Public key</InputLabel>
          <Input id='public-key' value={publicKey} onChange={(evt) => setPublicKey(evt.target.value)} />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl>
          <InputLabel htmlFor='private-key'>Private key</InputLabel>
          <Input id='private-key' value={privateKey} onChange={(evt) => setPrivateKey(evt.target.value)} />
        </FormControl>
      </FormRow>
      <FormRow>
        <Button type='submit' variant='contained' color='primary'>
        Submit
        </Button>
      </FormRow>
    </form>
  )
}

export default ApiKeysForm
