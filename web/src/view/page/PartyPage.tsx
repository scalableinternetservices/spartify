import * as React from 'react'

// TODO: Implement party page

interface PartyPageProps {
  partyName: string
  path: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PartyPage(props: PartyPageProps) {
  console.log(props)
  return (
    <>
      <style>{'body { background-color: black; }'}</style>
      <h1 style={{ color: 'white' }}>Kathy's Party</h1>
    </>
  )
}
