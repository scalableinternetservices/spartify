import { useQuery, useSubscription } from '@apollo/client'
import { Grid, GridList, makeStyles, Paper } from '@material-ui/core'
import GridListTile from '@material-ui/core/GridListTile/GridListTile'
import * as React from 'react'
import { FetchParty, FetchPartyVariables, PartySubscription, PartySubscriptionVariables } from '../../graphql/query.gen'
import { CurrentSong } from './CurrentSong'
import { allSongs, fetchParty, subscribeParty } from './fetchParty'
import { PlayedSong } from './PlayedSong'
import { Song } from './Song'
import { VotedSong } from './VotedSong'

interface PartyPageProps {
  partyName: string
  partyPassword: string
  path: string
}

// Creates a list of displayed songs
function createSongList(songArr: Array<any>) {
  return songArr.map((song: any) => {
    return {
      title: song.title,
      artist: song.artist,
      album: song.album,
      id: song.id,
    }
  })
}

// Creates a list of voted songs
function createVoteList(songArr: Array<any>) {
  return songArr.map((song: any) => {
    return {
      title: song.song.title,
      artist: song.song.artist,
      album: song.song.album,
      count: song.count,
    }
  })
}

// Creates a list of played songs
function createPlayedList(songArr: Array<any>) {
  return new Array<any>()
    .concat(songArr)
    .reverse()
    .map((song: any) => {
      return {
        title: song.song.title,
        artist: song.song.artist,
        album: song.song.album,
        id: song.song.id,
      }
    })
}

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
    marginTop: 20,
    paddingBottom: 10,
    borderRadius: 20,
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#66928f',
    fontSize: 16,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PartyPage(props: PartyPageProps) {
  const classes = useStyles()
  const { loading: partyLoading, data: partyInfo } = useQuery<FetchParty, FetchPartyVariables>(fetchParty, {
    variables: { partyName: props.partyName, partyPassword: props.partyPassword },
  })
  const [votedSongs, setVotedSongs] = React.useState(partyInfo?.party?.votedSongs)
  const [playedSongs, setPlayedSongs] = React.useState(partyInfo?.party?.playedSongs)
  const [currentSong, setCurrentSong] = React.useState(partyInfo?.party?.currentSong)
  const { loading: songLoading, data: songs } = useQuery(allSongs)
  const partyId = partyInfo?.party?.id === null ? 0 : partyInfo?.party?.id
  if (!partyId) { return <div></div> }

  const sub = useSubscription<PartySubscription, PartySubscriptionVariables>(subscribeParty, {
    variables: { partyId },
  })
  React.useEffect(() => {
    if (sub.data?.partyUpdates) {
      console.log(sub.data)
      setVotedSongs(sub.data.partyUpdates.votedSongs)
      setPlayedSongs(sub.data.partyUpdates.playedSongs)
      setCurrentSong(sub.data?.partyUpdates.currentSong)
    }
  }, [sub.data])

  if (!partyInfo?.party) {
    return <div>This party does not exist</div>
  }

  if (!songs?.songs) {
    return <div>No songs retrieved</div>
  }

  // const { votedSongs, playedSongs, currentSong } = partyInfo?.party
  const votedSongList = votedSongs === null || votedSongs === undefined ? [] : createVoteList(votedSongs)
  // playedSongList still needs to be updated
  const playedSongList = playedSongs === null || playedSongs === undefined ? [] : createPlayedList(playedSongs)
  const songList = songs.songs === null ? [] : createSongList(songs.songs)

  if (partyLoading) {
    return <div>Loading...</div>
  }

  if (songLoading) {
    return <div>Loading...</div>
  }

  // Song Library column - displays all available songs to vote for
  const library = (
    <Paper className={classes.paper}>
      <GridList cellHeight={90} cols={1} style={{ maxHeight: 600 }}>
        {songList.length == 0 && <p className={classes.placeholderText}>No songs were found in library</p>}
        {songList.map((song, i) => (
          <GridListTile key={i} cols={1}>
            <Song
              key={i}
              partyId={partyId}
              title={song.title}
              artist={song.artist}
              album={song.album}
              id={song.id}
              // refetchQuery={refetch}
            />
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  )

  // Queue column - displays songs with votes in decreasing order
  const queue = (
    <Paper className={classes.paper} style={{ backgroundColor: '434343' }}>
      <GridList cellHeight={90} cols={1} style={{ maxHeight: 600 }}>
        {votedSongList.length == 0 && <p className={classes.placeholderText}>No voted songs</p>}
        {votedSongList.map((song, i) => (
          <GridListTile key={i} cols={1}>
            <VotedSong key={i} title={song.title} artist={song.artist} album={song.album} count={song.count} />
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  )

  // Listening History column - displays previously played songs in the current party
  const history = (
    <Paper className={classes.paper}>
      <GridList cellHeight={90} cols={1} style={{ maxHeight: 600 }}>
        {playedSongList.length == 0 && <p className={classes.placeholderText}>No song history</p>}
        {playedSongList.map((song, i) => (
          <GridListTile key={i} cols={1}>
            <PlayedSong key={i} title={song.title} artist={song.artist} album={song.album} id={song.id} />
          </GridListTile>
        ))}
      </GridList>
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
            <CurrentSong
              title={currentSong?.title || "Nothing's playing yet!"}
              artist={currentSong?.artist || ''}
              album={currentSong?.album || ''}
              partyId={partyId}
              // refetchQuery={refetch}
            />
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
