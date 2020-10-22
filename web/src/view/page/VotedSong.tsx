import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'

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

export function VotedSong() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container justify="flex-end">
          {/* Song Info */}
          <Grid item xs={10}>
            <Typography variant="body2" className={classes.songInfo}>
              Artist Name
            </Typography>
            <Typography className={classes.songTitle}>Song Name</Typography>
            <Typography variant="body2" className={classes.songInfo}>
              Album Name
            </Typography>
          </Grid>

          {/* Votes */}
          <Grid item xs={2} className={classes.votes}>
            189 <br /> Votes
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
