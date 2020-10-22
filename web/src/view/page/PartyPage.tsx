import { Grid, makeStyles, Paper } from '@material-ui/core'
import * as React from 'react'
import { CurrentSong } from './CurrentSong'
import { PlayedSong } from './PlayedSong'
import { Song } from './Song'
import { VotedSong } from './VotedSong'

interface PartyPageProps {
  partyName: string
  path: string
}

const NAME = "Kathy's Party"

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

  const library = (
    <Paper className={classes.paper}>
      <Song />
      <Song />
      <Song />
      <Song />
    </Paper>
  )

  const queue = (
    <Paper className={classes.paper} style={{ backgroundColor: '434343' }}>
      <VotedSong />
      <VotedSong />
      <VotedSong />
      <VotedSong />
    </Paper>
  )

  const history = (
    <Paper className={classes.paper}>
      <PlayedSong />
      <PlayedSong />
      <PlayedSong />
      <PlayedSong />
    </Paper>
  )

  return (
    <>
      {/* Party Name */}
      <style>{'body { background-color: black; }'}</style>

      <Grid container style={{ marginTop: -90 }}>
        <Grid container style={{ paddingBottom: 40 }}>
          <Grid item xs={8} className={classes.partyName} style={{ paddingTop: 20 }}>
            {NAME}
          </Grid>
          <Grid item xs={4} className={classes.songListColumn}>
            Now Playing
            <CurrentSong />
          </Grid>
        </Grid>

        {/* Song Library */}
        <Grid item xs={4} className={classes.songListColumn}>
          Song Library
          {library}
        </Grid>

        {/* Queue */}
        <Grid item xs={4} className={classes.songListColumn}>
          Queue
          {queue}
        </Grid>

        {/* Listening History */}
        <Grid item xs={4} className={classes.songListColumn}>
          Listening History
          {history}
        </Grid>
      </Grid>
    </>
  )
}
