import { GraphQLResolveInfo } from 'graphql'
import { Party as PartyModel } from '../entities/Party'
import { VotedSong as VotedSongModel } from '../entities/VotedSong'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  party?: Maybe<Party>
  songs?: Maybe<Array<Song>>
}

export interface QueryPartyArgs {
  partyName: Scalars['String']
  partyPassword?: Maybe<Scalars['String']>
}

export interface Mutation {
  __typename?: 'Mutation'
  createParty?: Maybe<Party>
  vote?: Maybe<VotedSong>
  nextSong?: Maybe<Party>
}

export interface MutationCreatePartyArgs {
  partyName: Scalars['String']
  partyPassword?: Maybe<Scalars['String']>
}

export interface MutationVoteArgs {
  partyId: Scalars['Int']
  songId: Scalars['Int']
}

export interface MutationNextSongArgs {
  partyId: Scalars['Int']
}

export interface Party {
  __typename?: 'Party'
  id: Scalars['Int']
  name: Scalars['String']
  password?: Maybe<Scalars['String']>
  latestTime: Scalars['String']
  currentSong?: Maybe<Song>
  votedSongs?: Maybe<Array<VotedSong>>
  playedSongs?: Maybe<Array<PlayedSong>>
}

export interface VotedSong {
  __typename?: 'VotedSong'
  id: Scalars['Int']
  party: Party
  song: Song
  count: Scalars['Int']
}

export interface PlayedSong {
  __typename?: 'PlayedSong'
  id: Scalars['Int']
  party: Party
  song: Song
  sequenceNumber: Scalars['Int']
}

export interface Song {
  __typename?: 'Song'
  id: Scalars['Int']
  title: Scalars['String']
  artist: Scalars['String']
  album?: Maybe<Scalars['String']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Mutation: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Party: ResolverTypeWrapper<PartyModel>
  VotedSong: ResolverTypeWrapper<VotedSongModel>
  PlayedSong: ResolverTypeWrapper<Omit<PlayedSong, 'party'> & { party: ResolversTypes['Party'] }>
  Song: ResolverTypeWrapper<Song>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  String: Scalars['String']
  Mutation: {}
  Int: Scalars['Int']
  Party: PartyModel
  VotedSong: VotedSongModel
  PlayedSong: Omit<PlayedSong, 'party'> & { party: ResolversParentTypes['Party'] }
  Song: Song
  Boolean: Scalars['Boolean']
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  party?: Resolver<Maybe<ResolversTypes['Party']>, ParentType, ContextType, RequireFields<QueryPartyArgs, 'partyName'>>
  songs?: Resolver<Maybe<Array<ResolversTypes['Song']>>, ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createParty?: Resolver<
    Maybe<ResolversTypes['Party']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePartyArgs, 'partyName'>
  >
  vote?: Resolver<
    Maybe<ResolversTypes['VotedSong']>,
    ParentType,
    ContextType,
    RequireFields<MutationVoteArgs, 'partyId' | 'songId'>
  >
  nextSong?: Resolver<
    Maybe<ResolversTypes['Party']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSongArgs, 'partyId'>
  >
}

export type PartyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Party'] = ResolversParentTypes['Party']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  latestTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  currentSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType>
  votedSongs?: Resolver<Maybe<Array<ResolversTypes['VotedSong']>>, ParentType, ContextType>
  playedSongs?: Resolver<Maybe<Array<ResolversTypes['PlayedSong']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type VotedSongResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VotedSong'] = ResolversParentTypes['VotedSong']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  party?: Resolver<ResolversTypes['Party'], ParentType, ContextType>
  song?: Resolver<ResolversTypes['Song'], ParentType, ContextType>
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type PlayedSongResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlayedSong'] = ResolversParentTypes['PlayedSong']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  party?: Resolver<ResolversTypes['Party'], ParentType, ContextType>
  song?: Resolver<ResolversTypes['Song'], ParentType, ContextType>
  sequenceNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SongResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  album?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Party?: PartyResolvers<ContextType>
  VotedSong?: VotedSongResolvers<ContextType>
  PlayedSong?: PlayedSongResolvers<ContextType>
  Song?: SongResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
