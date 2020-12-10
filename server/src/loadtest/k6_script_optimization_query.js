// Related to: commit 8aef7661aa4fce016ed4ecc01c96c9edebbb097d

import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  scenarios: {
    vote_all_songs_then_next_song: {
      startTime: '0s',
      exec: 'vote_all_songs_then_next_song',
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 1,
    },
  },
}

// Use the sample party ("Sample Party 1" "Sample Password 1") that is preloaded by our db migrations.
const partyID = 1 // Assume the partyID since the db migration ensures that the ID will be 1.
// If this assumption is not correct, the server console output will show errors.

// DB migrations must populate songs with IDs 0 to maxSongID.
const maxSongID = 500

export function vote_all_songs_then_next_song() {
  for (let songID = 1; songID < maxSongID; songID++) {
    // Vote: Form the post request
    var urlVote = 'http://127.0.0.1:3000/graphql?opName=VoteSong'
    var payloadVote = JSON.stringify({
      operationName: 'VoteSong',
      variables: { partyId: partyID, songId: songID },
      query:
        'mutation VoteSong($partyId: Int!, $songId: Int!) {  vote(partyId: $partyId, songId: $songId) {    id    __typename  }}',
    })
    var paramsVote = {
      headers: {
        'content-type': 'application/json',
      },
    }

    // Vote: Make the post request
    http.post(urlVote, payloadVote, paramsVote)

    sleep(0.1)
  }

  // Sleep for 60 seconds to make a gap in the Honeycomb graph.
  sleep(60)

  // Next: Form the post request
  var urlVote = 'http://127.0.0.1:3000/graphql?opName=NextSong'
  var payloadVote = JSON.stringify({
    operationName: 'NextSong',
    variables: { partyId: partyID },
    query: 'mutation NextSong($partyId: Int!) {  nextSong(partyId: $partyId) {    id    __typename  }}',
  })
  var paramsVote = {
    headers: {
      'content-type': 'application/json',
    },
  }

  // Next: Make the post request
  http.post(urlVote, payloadVote, paramsVote)

  sleep(0.1)
}
