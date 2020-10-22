import { Button, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'

interface SongProps {
  title: string
  artist: string
}

// custom styling to override Material UI's default styles
const useStyles = makeStyles({
  card: {
    backgroundColor: '292929',
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
  button: {
    backgroundColor: 'ADCCCA',
    borderRadius: 8,
    padding: '3 8',
    marginTop: 10,
    textTransform: 'none',
    fontSize: 14,
    float: 'right',
    '&:hover': {
      backgroundColor: '628280',
    },
  },
})

export function Song(props: SongProps) {
  const classes = useStyles()

  function voteSong() {
    // TODO: implement vote for song functionality
    window.alert('Voted for song')
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container justify="flex-end">
          {/* Song Info */}
          <Grid item xs={8} md={9}>
            <Typography variant="body2" className={classes.songInfo}>
              {props.artist}
            </Typography>
            <Typography className={classes.songTitle}>{props.title}</Typography>
            <Typography variant="body2" className={classes.songInfo}>
              Album Name
            </Typography>
          </Grid>

          {/* Vote Button */}
          <Grid item xs={4} md={3}>
            <Button startIcon={<AddIcon />} className={classes.button} onClick={voteSong}>
              Vote
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
