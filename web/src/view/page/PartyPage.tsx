import { Card, CardContent, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import * as React from 'react'

// TODO: Implement party page

interface PartyPageProps {
  partyName: string
  path: string
}

const NAME = "Kathy's Party"

const useStyles = makeStyles({
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
  card: {
    backgroundColor: '292929',
    margin: 10,
    borderRadius: 8,
  },
  cardContent: {
    padding: 12,
    '&:last-child': {
      paddingBottom: 12,
    },
  },
  songTitle: {
    fontSize: 14,
    color: '599583',
  },
  songInfo: {
    fontSize: 12,
    color: '96A7A2',
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PartyPage(props: PartyPageProps) {
  const classes = useStyles()

  const song = (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" className={classes.songInfo}>
          Artist Name
        </Typography>
        <Typography className={classes.songTitle}>Song Name</Typography>
        <Typography variant="body2" className={classes.songInfo}>
          Album Name
        </Typography>
      </CardContent>
    </Card>
  )

  const library = (
    <Paper className={classes.paper}>
      {song} {song} {song} {song}
    </Paper>
  )

  return (
    <>
      {/* Party Name */}
      <style>{'body { background-color: black; }'}</style>
      <h1
        style={{
          color: '#5aaea9',
          marginTop: '-90px',
          fontSize: '40px',
          fontWeight: 'bold',
        }}
      >
        {NAME}
      </h1>

      <Grid container>
        {/* Song Library */}
        <Grid item xs={4} className={classes.songListColumn}>
          Song Library
          {library}
        </Grid>

        {/* Queue */}
        <Grid item xs={4} className={classes.songListColumn}>
          Queue
          {library}
        </Grid>

        {/* Listening History */}
        <Grid item xs={4} className={classes.songListColumn}>
          Listening History
          {library}
        </Grid>
      </Grid>
    </>
  )
}
