import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'

interface SongProps {
  title: string
  artist: string
  album: string
  id: number
}

// custom styling to override Material UI's default styles
const useStyles = makeStyles({
  card: {
    backgroundColor: 'FFFF',
    margin: 10,
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
  votes: {
    fontWeight: 500,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 12,
  },
})

export function VotedSong(props: SongProps) {
  const classes = useStyles()

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
              {props.album === null ? 'No album specified' : props.album}
            </Typography>
          </Grid>

          {/* Vote Count */}
          <Grid item xs={2} className={classes.votes}>
            189 <br /> Votes
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
