import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'

interface SongProps {
  title: string
  artist: string
}

// custom styling to override Material UI's default styles
const useStyles = makeStyles({
  card: {
    backgroundColor: '599583',
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
    color: 'white',
  },
  songInfo: {
    fontSize: 12,
    color: '292929',
  },
})

export function PlayedSong(props: SongProps) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" className={classes.songInfo}>
          {props.artist}
        </Typography>
        <Typography className={classes.songTitle}>{props.title}</Typography>
        <Typography variant="body2" className={classes.songInfo}>
          Album Name
        </Typography>
      </CardContent>
    </Card>
  )
}
