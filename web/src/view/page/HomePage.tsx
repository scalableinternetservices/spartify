import { useLazyQuery } from '@apollo/client'
import { Button, OutlinedInput, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { FetchParty, FetchPartyVariables } from '../../graphql/query.gen'
import { getPartyPath } from '../nav/route'
import { handleError } from '../toast/error'
import { fetchParty } from './fetchParty'
import { createParty } from './mutateParty'
// Props will take in a path and a function which sets the party name in AppBody
interface HomePageProps {
  path: string
  partyNameHandler: (arg0: string) => void
  partyPasswordHandler: (arg0: string) => void
}

// Constant height offset between buttons
const HEIGHT_DIFF = 36

// Hook used to override Material-UI's Button class
const useStyles = makeStyles(theme => ({
  title: {
    color: '#5aaea9',
    marginTop: '-160px',
    fontSize: '40px',
    fontWeight: 'bold',
  },
  button: {
    textTransform: 'none',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#c6dad9',
  },
  popupTitle: {
    color: '#5aaea9',
    marginTop: '25px',
    marginLeft: '30px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  inputPrompt: {
    color: 'white',
    marginTop: '25px',
    marginLeft: '30px',
    fontSize: '13px',
    fontWeight: 'normal',
  },
  input: {
    width: '230px',
    left: '28px',
    marginTop: '10px',
    background: 'white',
  },
  errorText: {
    textAlign: 'center',
    color: '#ab6a8e',
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
  const classes = useStyles()
  // partyNameHandler is a prop passed in by AppBody which is used to lift state.
  // This is so we can pass the party name into <PartyPage />
  const { partyNameHandler, partyPasswordHandler } = props
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isCreatePage, setCreate] = useState(false) // Checks for create page popup
  const [isJoinPage, setLogin] = useState(true) // Checks for join page popup
  const [{ createError, joinError }, setError] = useState({ createError: false, joinError: false })

  // Sets party name to value entered in text field
  const handleName = (e: any) => {
    setName(e.target.value)
    partyNameHandler(e.target.value)
  }

  // Sets party password to value entered in text field
  const handlePassword = (e: any) => {
    setPassword(e.target.value)
    partyPasswordHandler(e.target.value)
  }

  // Use createParty mutation to create and join a new party
  function handleSubmit() {
    // Reject empty party name. The API allows an empty party name, but we decide in the frontend that it's not allowed.
    if (name == '') {
      setError({ createError: true, joinError: false })
      return
    }
    // Create and join a new party
    createParty(getApolloClient(), name, password)
      .then(() => {
        // void navigate(getPath(Route.PARTY))
        void navigate(getPartyPath(name, password))
      })
      .catch(err => {
        handleError(err)
        setError({ createError: true, joinError: false })
      })
  }

  // Use useLazyQuery() to execute a query at a time other than component render (which is when useQuery() executes).
  // TODO: Currently, the party query is executed here and in PartyPage. A future optimization can be to prevent this.
  const [joinParty, { data }] = useLazyQuery<FetchParty, FetchPartyVariables>(fetchParty, {
    variables: { partyName: name, partyPassword: password },
    onCompleted: joinPartyCallback,
    onError: err => console.log(`fetchParty error: \n${err}`),
  })

  function joinPartyCallback() {
    // Reject empty party name
    if (name == '') {
      setError({ createError: false, joinError: true })
    } else {
      // Verify existence of party using data returned from toParty()
      if (!data?.party) {
        setError({ createError: false, joinError: true })
      } else {
        // void navigate(getPath(Route.PARTY))
        void navigate(getPartyPath(name, password))
      }
    }
  }

  function clearFields() {
    setName('')
    setPassword('')
    partyNameHandler('')
    partyPasswordHandler('')
    setError({ createError: false, joinError: false })
  }

  // Button that users select to create a party
  const create = (
    <Button
      style={{ left: '-70px', top: -20 }}
      className={classes.button}
      onClick={() => {
        setCreate(true)
        setLogin(false)
        clearFields()
      }}
    >
      <p className={classes.buttonText}>create a party</p>
    </Button>
  )

  // Button that users select to join a party
  const join = (
    <Button
      style={{ left: '70px', top: -20 - HEIGHT_DIFF }}
      className={classes.button}
      onClick={() => {
        setLogin(true)
        setCreate(false)
        clearFields()
      }}
    >
      <p className={classes.buttonText}>join a party</p>
    </Button>
  )

  // Popup function that returns popup based on whether user is creating
  // a party or joining a party
  const popup = (message1: string, message2: string) => {
    return (
      <div className={classes.root}>
        <Paper variant="elevation">
          <h1 className={classes.popupTitle}>{message1}</h1>
          <h2
            style={{
              marginTop: '25px',
            }}
            className={classes.inputPrompt}
          >
            Party Name
          </h2>
          <OutlinedInput className={classes.input} defaultValue="" onChange={handleName} />
          <h2
            style={{
              marginTop: '10px',
            }}
            className={classes.inputPrompt}
          >
            Password (optional)
          </h2>
          <OutlinedInput className={classes.input} defaultValue="" onChange={handlePassword} />
          {/* Button which routes to party page */}
          <Button
            style={{ background: '#659383', left: '80px', marginTop: '20px', fontWeight: 'bold' }}
            className={classes.button}
            onClick={() => {
              isCreatePage ? handleSubmit() : joinParty()
            }}
          >
            <ul>
              <h1 style={{ color: 'white' }}>{message2}</h1>
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
      <h1 className={classes.title}>spartify</h1>
      {/* Popups only appear if the join or create buttons have been pressed */}
      {isJoinPage && popup('Join a party', 'Join the party!')}
      {isCreatePage && popup('Create a party', 'Start the party!')}
      {/* Either creation or join error may appear depending on user input */}
      {createError && (
        <p className={classes.errorText}>
          Looks like there was an issue creating your party. That name may already exist.
        </p>
      )}
      {joinError && <p className={classes.errorText}>Looks like that party may not exist.</p>}
    </>
  )
}
