import { Button, OutlinedInput, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { useState } from 'react'

interface HomePageProps {
  path: string
  partyNameHandler: any
}

const HEIGHT_DIFF = 36

// const PLACEHOLDER_NAME = 'name'
// const PLACEHOLDER_PASSWORD = 'pw'

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
  },
  root: {
    display: 'flex',
    '& > *': {
      background: '#414342',
      margin: theme.spacing(1),
      width: theme.spacing(37),
      height: theme.spacing(35),
      marginTop: '160px',
    },
  },
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  const { partyNameHandler } = props
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isCreatePage, setCreate] = useState(false)
  const [isLoginPage, setLogin] = useState(false)
  const classes = useStyles()

  console.log(name, password)

  const handleName = (e: any) => {
    setName(e.target.value)
    partyNameHandler(e.target.value)
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const isValidName = () => {
    return name.length > 0
  }

  isValidName()

  const create = (
    <div>
      <Button
        style={{ left: '-70px', top: -20, fontWeight: 'bold' }}
        className={classes.button}
        onClick={() => {
          if (!isLoginPage) {
            setCreate(!isCreatePage)
            setName('')
            setPassword('')
            partyNameHandler('')
          }
        }}
      >
        <p style={{ color: '#c6dad9' }}>create a party</p>
      </Button>
    </div>
  )

  const join = (
    <div>
      <Button
        style={{ left: '70px', top: -20 - HEIGHT_DIFF, fontWeight: 'bold' }}
        className={classes.button}
        onClick={() => {
          if (!isCreatePage) {
            setLogin(!isLoginPage)
            setName('')
            setPassword('')
            partyNameHandler('')
          }
        }}
      >
        <p style={{ color: 'c6dad9' }}>join a party</p>
      </Button>
    </div>
  )

  const createPopup = (
    <div className={classes.root}>
      <Paper variant="elevation">
        <h1
          style={{
            color: '#5aaea9',
            marginTop: '25px',
            marginLeft: '30px',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        >
          Create a party
        </h1>
        <h2
          style={{
            color: 'white',
            marginTop: '25px',
            marginLeft: '30px',
            fontSize: '13px',
            fontWeight: 'normal',
          }}
        >
          Party Name
        </h2>
        <OutlinedInput
          style={{ width: '230px', left: '28px', marginTop: '10px', background: 'white' }}
          defaultValue=""
          onChange={handleName}
        />
        <h2
          style={{
            color: 'white',
            marginTop: '10px',
            marginLeft: '30px',
            fontSize: '13px',
            fontWeight: 'normal',
          }}
        >
          Password (optional)
        </h2>
        <OutlinedInput
          style={{ width: '230px', left: '28px', marginTop: '10px', background: 'white' }}
          defaultValue=""
          onChange={handlePassword}
        />
        <Button
          style={{ background: '#659383', left: '80px', marginTop: '20px', fontWeight: 'bold' }}
          className={classes.button}
        >
          <p style={{ color: 'white' }}>Start the party!</p>
        </Button>
      </Paper>
    </div>
  )

  const joinPopup = (
    <div className={classes.root}>
      <Paper variant="elevation">
        <h1
          style={{
            color: '#5aaea9',
            marginTop: '25px',
            marginLeft: '30px',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        >
          Join a party
        </h1>
        <h2
          style={{
            color: 'white',
            marginTop: '25px',
            marginLeft: '30px',
            fontSize: '13px',
            fontWeight: 'bold',
          }}
        >
          Party Name
        </h2>
        <OutlinedInput
          style={{ width: '230px', left: '28px', marginTop: '10px', background: 'white' }}
          defaultValue=""
          onChange={handleName}
        />
        <h2
          style={{
            color: 'white',
            marginTop: '10px',
            marginLeft: '30px',
            fontSize: '13px',
            fontWeight: 'normal',
          }}
        >
          Password (optional)
        </h2>
        <OutlinedInput
          style={{ width: '230px', left: '28px', marginTop: '10px', background: 'white' }}
          defaultValue=""
          onChange={handlePassword}
        />
        <Button
          style={{ background: '#659383', left: '80px', marginTop: '20px', fontWeight: 'bold' }}
          className={classes.button}
        >
          <p style={{ color: 'white' }}>Join the party!</p>
        </Button>
      </Paper>
    </div>
  )

  return (
    <>
      <style>{'body { background-color: black; }'}</style>

      {create}
      {join}

      <h1
        style={{
          color: '#5aaea9',
          marginTop: '-160px',
          fontSize: '40px',
          fontWeight: 'bold',
        }}
      >
        spartify
      </h1>

      {isLoginPage && joinPopup}
      {isCreatePage && createPopup}
    </>
  )
}
