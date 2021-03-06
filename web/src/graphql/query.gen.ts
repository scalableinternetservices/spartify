/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllSongs
// ====================================================

export interface AllSongs_songs {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface AllSongs {
  songs: AllSongs_songs[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PartySubscription
// ====================================================

export interface PartySubscription_partyUpdates_currentSong {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface PartySubscription_partyUpdates_votedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface PartySubscription_partyUpdates_votedSongs {
  __typename: "VotedSong";
  id: number;
  song: PartySubscription_partyUpdates_votedSongs_song;
  count: number;
}

export interface PartySubscription_partyUpdates_playedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface PartySubscription_partyUpdates_playedSongs {
  __typename: "PlayedSong";
  id: number;
  song: PartySubscription_partyUpdates_playedSongs_song;
  sequenceNumber: number;
}

export interface PartySubscription_partyUpdates {
  __typename: "Party";
  id: number;
  name: string;
  password: string | null;
  latestTime: string;
  currentSong: PartySubscription_partyUpdates_currentSong | null;
  votedSongs: PartySubscription_partyUpdates_votedSongs[] | null;
  playedSongs: PartySubscription_partyUpdates_playedSongs[] | null;
}

export interface PartySubscription {
  partyUpdates: PartySubscription_partyUpdates | null;
}

export interface PartySubscriptionVariables {
  partyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchParty
// ====================================================

export interface FetchParty_party_currentSong {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface FetchParty_party_votedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface FetchParty_party_votedSongs {
  __typename: "VotedSong";
  id: number;
  song: FetchParty_party_votedSongs_song;
  count: number;
}

export interface FetchParty_party_playedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface FetchParty_party_playedSongs {
  __typename: "PlayedSong";
  id: number;
  song: FetchParty_party_playedSongs_song;
  sequenceNumber: number;
}

export interface FetchParty_party {
  __typename: "Party";
  id: number;
  name: string;
  password: string | null;
  latestTime: string;
  currentSong: FetchParty_party_currentSong | null;
  votedSongs: FetchParty_party_votedSongs[] | null;
  playedSongs: FetchParty_party_playedSongs[] | null;
}

export interface FetchParty {
  party: FetchParty_party | null;
}

export interface FetchPartyVariables {
  partyName: string;
  partyPassword?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateParty
// ====================================================

export interface CreateParty_createParty_currentSong {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface CreateParty_createParty_votedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface CreateParty_createParty_votedSongs {
  __typename: "VotedSong";
  id: number;
  song: CreateParty_createParty_votedSongs_song;
  count: number;
}

export interface CreateParty_createParty_playedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface CreateParty_createParty_playedSongs {
  __typename: "PlayedSong";
  id: number;
  song: CreateParty_createParty_playedSongs_song;
  sequenceNumber: number;
}

export interface CreateParty_createParty {
  __typename: "Party";
  id: number;
  name: string;
  password: string | null;
  latestTime: string;
  currentSong: CreateParty_createParty_currentSong | null;
  votedSongs: CreateParty_createParty_votedSongs[] | null;
  playedSongs: CreateParty_createParty_playedSongs[] | null;
}

export interface CreateParty {
  createParty: CreateParty_createParty | null;
}

export interface CreatePartyVariables {
  partyName: string;
  partyPassword?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VoteSong
// ====================================================

export interface VoteSong_vote {
  __typename: "VotedSong";
  id: number;
}

export interface VoteSong {
  vote: VoteSong_vote | null;
}

export interface VoteSongVariables {
  partyId: number;
  songId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NextSong
// ====================================================

export interface NextSong_nextSong {
  __typename: "Party";
  id: number;
}

export interface NextSong {
  nextSong: NextSong_nextSong | null;
}

export interface NextSongVariables {
  partyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Song
// ====================================================

export interface Song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VotedSong
// ====================================================

export interface VotedSong_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface VotedSong {
  __typename: "VotedSong";
  id: number;
  song: VotedSong_song;
  count: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlayedSong
// ====================================================

export interface PlayedSong_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface PlayedSong {
  __typename: "PlayedSong";
  id: number;
  song: PlayedSong_song;
  sequenceNumber: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Party
// ====================================================

export interface Party_currentSong {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface Party_votedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface Party_votedSongs {
  __typename: "VotedSong";
  id: number;
  song: Party_votedSongs_song;
  count: number;
}

export interface Party_playedSongs_song {
  __typename: "Song";
  id: number;
  title: string;
  artist: string;
  album: string | null;
}

export interface Party_playedSongs {
  __typename: "PlayedSong";
  id: number;
  song: Party_playedSongs_song;
  sequenceNumber: number;
}

export interface Party {
  __typename: "Party";
  id: number;
  name: string;
  password: string | null;
  latestTime: string;
  currentSong: Party_currentSong | null;
  votedSongs: Party_votedSongs[] | null;
  playedSongs: Party_playedSongs[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
