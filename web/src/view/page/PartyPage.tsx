import * as React from 'react'

// TODO: Implement party page

interface PartyPageProps {
  partyName: string
  path: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PartyPage(props: PartyPageProps) {
  return (
    <>
      <style>{'body { background-color: black; }'}</style>
      <h1 style={{ color: 'white' }}>{props.partyName}</h1>
    </>
  )
}
