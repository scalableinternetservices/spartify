import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'

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
})

export function CurrentSong() {
  const classes = useStyles()

  return (
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
}
