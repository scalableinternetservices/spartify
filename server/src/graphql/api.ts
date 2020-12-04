import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { Party } from '../entities/Party'
import { PlayedSong } from '../entities/PlayedSong'
import { Song } from '../entities/Song'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  request: Request
  response: Response
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    party: async (_, { partyName, partyPassword }) => {
      const party = await Party.findOne({ name: partyName, password: partyPassword || null })
      return party || null
    },
    songs: () => Song.find(),
  },
  Mutation: {
    vote: async (_, { partyId, songId }) => {
      const party = await Party.findOne(partyId)
      const song = await Song.findOne(songId)

      if (party && song) {
        return party.voteForSong(song)
      } else {
        return null
      }
    },
    createParty: async (_, { partyName, partyPassword }) => {
      const party = await new Party(partyName, partyPassword || undefined).save()
      await party.reload() // We have to reload() because save() doesn't return the entire Party object.
      return party
    },
    nextSong: async (_, { partyId }) => {
      const party = await Party.findOne(partyId)
      await party?.playNextSong()
      await party?.reload()
      return party || null
    },
  },
  // Rely on the resolver chain and async/partial resolution to perform the data conversion necessary for the API.
  Party: {
    latestTime: parent => parent.latestTime.toString(),
    votedSongs: async self => {
      return self.getSortedVotedSongs()
    },
    playedSongs: async self => {
      // I cast here because playedSongs.song is a Promise, but I know that we'll just use the PlayedSong resolver to get an actual Song.
      return (await self.playedSongs) as any
    },
    currentSong: async self => {
      return (await self.getCurrentSong()) || null
    },
  },
  VotedSong: {
    song: async self => {
      return self.getSong()
    },
  },
  PlayedSong: {
    song: async self => {
      // For some reason the type of self is not PlayedSong so I have to cast it. TODO: investigate this.
      const parentPlayedSong = (self as unknown) as PlayedSong
      return parentPlayedSong.getSong()
    },
  },
}
