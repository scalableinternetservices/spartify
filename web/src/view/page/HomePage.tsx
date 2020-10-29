import { Button, OutlinedInput, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { useState } from 'react'
import { Link } from '../nav/Link'
import { getPath, Route } from '../nav/route'

// Props will take in a path and a function which sets the party name in AppBody
interface HomePageProps {
  path: string
  partyNameHandler: (arg0: string) => void
}

// Constant height offset between buttons
const HEIGHT_DIFF = 36

// Temporary placeholder name and password before we query
const NAME = "Kathy's Party"
const PASSWORD = "Kathy's Password"

// Hook used to override Material-UI's Button class
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
  // partyNameHandler is a prop passed in by AppBody which is used to lift state.
  // This is so we can pass the party name into <PartyPage />
  const { partyNameHandler } = props
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isCreatePage, setCreate] = useState(false) // Checks for create page popup
  const [isJoinPage, setLogin] = useState(false) // Checks for join page popup
  const classes = useStyles()

  // Sets party name to value entered in text field
  const handleName = (e: any) => {
    setName(e.target.value)
    partyNameHandler(e.target.value)
  }

  // Sets party password to value entered in text field
  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

  // Will eventually make a GraphQL query to check if name and password match
  const areValidCredentials = () => {
    return name.length > 0 && name === NAME && password === PASSWORD
  }

  // Button that users select to create a party
  const create = (
    <Button
      style={{ left: '-70px', top: -20, fontWeight: 'bold' }}
      className={classes.button}
      onClick={() => {
        if (!isJoinPage) {
          setCreate(!isCreatePage)
          setName('')
          setPassword('')
          partyNameHandler('')
        }
      }}
    >
      <p style={{ color: '#c6dad9' }}>create a party</p>
    </Button>
  )

  // Button that users select to join a party
  const join = (
    <Button
      style={{ left: '70px', top: -20 - HEIGHT_DIFF, fontWeight: 'bold' }}
      className={classes.button}
      onClick={() => {
        if (!isCreatePage) {
          setLogin(!isJoinPage)
          setName('')
          setPassword('')
          partyNameHandler('')
        }
      }}
    >
      <p style={{ color: '#c6dad9' }}>join a party</p>
    </Button>
  )

  // Popup function that returns popup based on whether user is creating
  // a party or joining a party
  const popup = (message1: string, message2: string) => {
    return (
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
            {message1}
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
          {/* Button which routes to party page */}
          <Button
            style={{ background: '#659383', left: '80px', marginTop: '20px', fontWeight: 'bold' }}
            className={classes.button}
          >
            <ul>
              <Link to={areValidCredentials() ? getPath(Route.PARTY) : getPath(Route.HOME)}>
                <h1 style={{ color: 'white' }}>{message2}</h1>
              </Link>
            </ul>
          </Button>
        </Paper>
      </div>
    )
  }

  return (
    <>
      <style>{'body { background-color: black; }'}</style>

      {/* Create and join buttons */}
      {create}
      {join}

      {/* Title */}
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

      {/* Popups only appear if the join or create buttons have been pressed */}
      {isJoinPage && popup('Join a party', 'Join the party!')}
      {isCreatePage && popup('Create a party', 'Start the party!')}
    </>
  )
}
