import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { Party } from '../entities/Party'
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
    party: async (_, { partyName, partyPassword }) =>
      (await Party.findOne({ name: partyName, password: partyPassword || undefined })) || null,
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
      return await new Party(partyName, partyPassword || undefined).save()
    },
    nextSong: async (_, { partyId }) => {
      const party = await Party.findOne(partyId)
      await party?.playNextSong()
      return party || null
    },
  },
  // Rely on the resolver chain and async/partial resolution to perform the data conversion necessary for the API.
  Party: {
    latestTime: parent => parent.latestTime.toString(),
  },
}
