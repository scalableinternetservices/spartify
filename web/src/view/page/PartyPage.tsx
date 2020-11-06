import { useQuery } from '@apollo/client'
import { Grid, makeStyles, Paper } from '@material-ui/core'
import * as React from 'react'
import { FetchParty, FetchPartyVariables } from '../../graphql/query.gen'
import { CurrentSong } from './CurrentSong'
import { fetchParty } from './fetchParty'
import { PlayedSong } from './PlayedSong'
import { Song } from './Song'
import { VotedSong } from './VotedSong'

interface PartyPageProps {
  partyName: string
  partyPassword: string
  path: string
}

// temporary placeholder data
const songList = [
  {
    title: 'Trigger Of Love',
    artist: 'JAWNY',
  },
  {
    title: 'Winona',
    artist: 'Miloe',
  },
  {
    title: 'Sharpener',
    artist: 'Cavetown',
  },
  {
    title: 'UNBOUND',
    artist: 'MICHELLE',
  },
  {
    title: 'Wishful Thinking',
    artist: 'BENEE',
  },
  {
    title: 'Together',
    artist: 'beabadoobee',
  },
  {
    title: 'going out',
    artist: 'ROLE MODEL',
  },
]

// custom styling to override Material UI's default styles
const useStyles = makeStyles({
  partyName: {
    color: '#5aaea9',
    fontSize: '40px',
    fontWeight: 'bold',
  },
  songListColumn: {
    color: '#5aaea9',
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  paper: {
    padding: 1,
    marginTop: 20,
    borderRadius: 20,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PartyPage(props: PartyPageProps) {
  const classes = useStyles()
  const { loading, data } = useQuery<FetchParty, FetchPartyVariables>(fetchParty, {
    variables: { partyName: props.partyName, partyPassword: props.partyPassword },
  })

  if (loading) {
    return <div>Loading...</div>
  }
  if (!data?.party) {
    return <div>This party does not exist</div>
  }

  // Song Library column - displays all available songs to vote for
  const library = (
    <Paper className={classes.paper}>
      {songList.map((song, i) => (
        <Song key={i} title={song.title} artist={song.artist} />
      ))}
    </Paper>
  )

  // Queue column - displays songs with votes in decreasing order
  const queue = (
    <Paper className={classes.paper} style={{ backgroundColor: '434343' }}>
      {songList.map((song, i) => (
        <VotedSong key={i} title={song.title} artist={song.artist} />
      ))}
    </Paper>
  )

  // Listening History column - displays previously played songs in the current party
  const history = (
    <Paper className={classes.paper}>
      {songList.map((song, i) => (
        <PlayedSong key={i} title={song.title} artist={song.artist} />
      ))}
    </Paper>
  )

  return (
    <>
      <style>{'body { background-color: black; }'}</style>

      <Grid container style={{ marginTop: -90 }}>
        <Grid container style={{ paddingBottom: 40 }}>
          {/* Party Name */}
          <Grid item xs={12} md={8} className={classes.partyName} style={{ paddingTop: 20 }}>
            {props.partyName}
          </Grid>

          {/* Current Playing Song */}
          <Grid item xs={12} md={4} className={classes.songListColumn}>
            Now Playing
            <CurrentSong />
          </Grid>
        </Grid>

        {/* Song Library */}
        <Grid item xs={12} md={4} className={classes.songListColumn}>
          Song Library
          {library}
        </Grid>

        {/* Queue */}
        <Grid item xs={12} md={4} className={classes.songListColumn}>
          Queue
          {queue}
        </Grid>

        {/* Listening History */}
        <Grid item xs={12} md={4} className={classes.songListColumn}>
          Listening History
          {history}
        </Grid>
      </Grid>
    </>
  )
}
