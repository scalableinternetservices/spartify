import { useMutation } from '@apollo/client'
import { Card, CardContent, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import * as React from 'react'
import { NextSong, NextSongVariables } from '../../graphql/query.gen'
import { nextSongMutation } from './mutateParty'

interface CurrentSongProps {
  title: string
  artist: string
  album: string
  partyId: number
  refetchQuery: () => void
}

// custom styling to override Material UI's default styles
const useStyles = makeStyles({
  card: {
    backgroundColor: '292929',
    marginTop: 15,
    borderRadius: 10,
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
  button: {
    backgroundColor: 'ADCCCA',
    borderRadius: 8,
    padding: '3 8',
    marginTop: 9,
    textTransform: 'none',
    fontSize: 14,
    '&:hover': {
      backgroundColor: '628280',
    },
  },
})

export function CurrentSong(props: CurrentSongProps) {
  const classes = useStyles()
  const [addNext] = useMutation<NextSong, NextSongVariables>(nextSongMutation, {
    onCompleted: props.refetchQuery,
    onError: err => console.log(`nextSongMutation error: \n${err}`),
  })
  function nextSong() {
    void addNext({ variables: { partyId: props.partyId } })
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container justify="flex-end">
          {/* Song Info */}
          <Grid item xs={10}>
            <Typography variant="body2" className={classes.songInfo}>
              {props.artist}
            </Typography>
            <Typography className={classes.songTitle}>{props.title}</Typography>
            <Typography variant="body2" className={classes.songInfo}>
              {props.album}
            </Typography>
          </Grid>

          {/* Next Button */}
          <Grid item xs={2}>
            <IconButton className={classes.button} onClick={nextSong}>
              <SkipNextIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
