import { ApolloClient, gql } from '@apollo/client'
import { CreateParty, CreatePartyVariables } from '../../graphql/query.gen'
import { fragmentParty, fragmentPlayedSong, fragmentSong, fragmentVotedSong } from './fetchParty'

const createPartyMutation = gql`
  mutation CreateParty($partyName: String!, $partyPassword: String) {
    createParty(partyName: $partyName, partyPassword: $partyPassword) {
      ...Party
    }
  }
  ${fragmentParty}
  ${fragmentSong}
  ${fragmentVotedSong}
  ${fragmentPlayedSong}
`

export function createParty(client: ApolloClient<any>, partyName: string, partyPassword: string) {
  return client.mutate<CreateParty, CreatePartyVariables>({
    mutation: createPartyMutation,
    variables: { partyName, partyPassword },
  })
}
