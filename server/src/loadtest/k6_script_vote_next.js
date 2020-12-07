import http from 'k6/http'
import { sleep } from 'k6'

const vusPerScenario = 300

export let options = {
  scenarios: {
    vote_song: { // Start 0s (concurrently)
      startTime: '0s',
      exec: 'vote_song',
      executor: 'ramping-arrival-rate', // Rate not affected by the SUT's performance, unlike with ramping-vus.
      preAllocatedVUs: vusPerScenario, // == maxVUs when maxVUs not specified.
      startRate: 0,
      stages: [
        { duration: '60s', target: 1000 },
        { duration: '30s', target: 3000 },
        { duration: '10s', target: 3000 },
      ],
    },
    next_song: { // Start 0s (concurrently)
      startTime: '0s',
      exec: 'next_song',
      executor: 'ramping-arrival-rate', // Rate not affected by the SUT's performance, unlike with ramping-vus.
      preAllocatedVUs: vusPerScenario, // == maxVUs when maxVUs not specified.
      startRate: 0,
      stages: [
        { duration: '60s', target: 1000 },
        { duration: '30s', target: 3000 },
        { duration: '10s', target: 3000 },
      ],
    },
  },
}

// Use the sample party ("Sample Party 1" "Sample Password 1") that is preloaded by our db migrations.
const partyID = 1 // Assume the partyID since the db migration ensures that the ID will be 1.
// If this assumption is not correct, the server console output will show errors.

// Use some random song
const songID = 13

function vote_song_helper() {
  // Vote: Form the post request
  var urlFetch = 'http://localhost:3000/graphql?opName=VoteSong'
  var payloadFetch = JSON.stringify({
    operationName: 'VoteSong',
    variables: { partyId: partyID, songId: songID },
    query:
      'mutation VoteSong($partyId: Int!, $songId: Int!) {  vote(partyId: $partyId, songId: $songId) {    id    __typename  }}',
  })
  var paramsFetch = {
    headers: {
      'content-type': 'application/json',
    },
  }

  // Vote: Make the post request
  http.post(urlFetch, payloadFetch, paramsFetch)
}

export function vote_song() {
  vote_song_helper()
  vote_song_helper()

  sleep(0.1)
}

export function next_song() {
  // Next: Form the post request
  var urlVote = 'http://localhost:3000/graphql?opName=NextSong'
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

  vote_song_helper()

  sleep(0.1)
}
