import http from 'k6/http'
import { sleep } from 'k6'

const vusPerScenario = 300

export let options = {
  scenarios: {
    create_parties: {
      startTime: '0s',
      exec: 'create_parties',
      executor: 'ramping-arrival-rate', // Rate not affected by the SUT's performance, unlike with ramping-vus.
      preAllocatedVUs: vusPerScenario, // == maxVUs when maxVUs not specified.
      startRate: 0,
      stages: [
        { duration: '60s', target: 1000 },
        { duration: '30s', target: 3000 },
        { duration: '10s', target: 3000 },
      ],
    }, // Ends 100s
    // Wait 20s
    join_parties: {
      startTime: '120s',
      exec: 'join_parties',
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

// Tests won't be deterministic, but they should be close enough
export function partyNamePassword(vu, iter) {
  return `$load_test_party_VU_${vu}_ITER_${iter}`
}

export function create_parties() {
  let uniquePartyNamePassword = partyNamePassword(__VU, __ITER) // k6 global execution context vars

  // Form the post request
  var url = 'http://localhost:3000/graphql?opName=CreateParty'
  var payload = JSON.stringify({
    operationName: 'CreateParty',
    variables: { partyName: uniquePartyNamePassword, partyPassword: uniquePartyNamePassword },
    query:
      'mutation CreateParty($partyName: String!, $partyPassword: String) {  createParty(partyName: $partyName, partyPassword: $partyPassword) {    ...Party    __typename  }}fragment Party on Party {  id  name  password  latestTime  currentSong {    ...Song    __typename  }  votedSongs {    ...VotedSong    __typename  }  playedSongs {    ...PlayedSong    __typename  }  __typename}fragment Song on Song {  id  title  artist  album  __typename}fragment VotedSong on VotedSong {  id  song {    ...Song    __typename  }  count  __typename}fragment PlayedSong on PlayedSong {  id  song {    ...Song    __typename  }  sequenceNumber  __typename}',
  })
  var params = {
    headers: {
      'content-type': 'application/json',
    },
  }

  // Make the post request
  http.post(url, payload, params)

  sleep(0.1)
}

export function join_parties() {
  let uniquePartyNamePassword = partyNamePassword(__VU - vusPerScenario, __ITER) // k6 global execution context vars
  // __VU by this point will be 301-600, hence the subtract by vusPerScenario so that the party names will be the same.

  // Form the post request
  var url = 'http://localhost:3000/graphql?opName=FetchParty'
  var payload = JSON.stringify({
    operationName: 'FetchParty',
    variables: { partyName: uniquePartyNamePassword, partyPassword: uniquePartyNamePassword },
    query:
      'query FetchParty($partyName: String!, $partyPassword: String) {  party(partyName: $partyName, partyPassword: $partyPassword) {    ...Party    __typename  }}fragment Party on Party {  id  name  password  latestTime  currentSong {    ...Song    __typename  }  votedSongs {    ...VotedSong    __typename  }  playedSongs {    ...PlayedSong    __typename  }  __typename}fragment Song on Song {  id  title  artist  album  __typename}fragment VotedSong on VotedSong {  id  song {    ...Song    __typename  }  count  __typename}fragment PlayedSong on PlayedSong {  id  song {    ...Song    __typename  }  sequenceNumber  __typename}',
  })
  var params = {
    headers: {
      'content-type': 'application/json',
    },
  }

  // Make the post request
  http.post(url, payload, params)

  sleep(0.1)
}
