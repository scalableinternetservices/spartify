import { gql } from '@apollo/client'

export const allSongs = gql`
  query AllSongs {
    songs {
      id
      title
      artist
      album
    }
  }
`

export const fragmentSong = gql`
  fragment Song on Song {
    id
    title
    artist
    album
  }
`

export const fragmentVotedSong = gql`
  fragment VotedSong on VotedSong {
    id
    song {
      ...Song
    }
    count
  }
`

export const fragmentPlayedSong = gql`
  fragment PlayedSong on PlayedSong {
    id
    song {
      ...Song
    }
    sequenceNumber
  }
`

export const fragmentParty = gql`
  fragment Party on Party {
    id
    name
    password
    latestTime
    currentSong {
      ...Song
    }
    votedSongs {
      ...VotedSong
    }
    playedSongs {
      ...PlayedSong
    }
  }
`

export const subscribeParty = gql`
  subscription PartySubscription($partyId: Int!) {
    partyUpdates(partyId: $partyId) {
      name
      id
      password
      playedSongs {
        sequenceNumber
        song {
          title
          artist
          album
        }
      }
    }
  }
`

export const fetchParty = gql`
  query FetchParty($partyName: String!, $partyPassword: String) {
    party(partyName: $partyName, partyPassword: $partyPassword) {
      ...Party
    }
  }
  ${fragmentParty}
  ${fragmentSong}
  ${fragmentVotedSong}
  ${fragmentPlayedSong}
`
