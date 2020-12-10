// Related to: commit af2ff27e02d6fa18ef79acd276fc5e977602d59f
//             (branch route-url)

import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  scenarios: {
    get_party_page_once: {
      startTime: '0s',
      exec: 'get_party_page',
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 1,
    },
  },
}

export function get_party_page() {
  // Use the first party that was manually created. ('testtest', no password)
  http.get('http://localhost:3000/app/party?partyName=testtest')
  sleep(0.1)
}
