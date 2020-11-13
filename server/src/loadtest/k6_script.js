import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  scenarios: {
    // home_page: {
    //   startTime: '0s',
    //   exec: 'home_page',
    //   executor: 'ramping-vus', // Rate affected by the SUT's performance.
    //   startVUs: 0,
    //   stages: [
    //     { duration: '60s', target: 200 },
    //     { duration: '15s', target: 200 },
    //   ],
    //   gracefulRampDown: '10s', // Not strictly necessary since target does not decrease (no ramp down).
    // },
    home_page: {
      startTime: '0s',
      exec: 'home_page',
      executor: 'ramping-arrival-rate', // Rate not affected by the SUT's performance, unlike with ramping-vus.
      preAllocatedVUs: 300, // == maxVUs when maxVUs not specified.
      startRate: 0,
      stages: [
        { duration: '60s', target: 1000 },
        { duration: '30s', target: 3000 },
        { duration: '10s', target: 3000 },
      ],
    },
    // party_page: {
    //   startTime: '120s',
    //   exec: 'party_page',
    //   executor: 'ramping-arrival-rate',
    //   preAllocatedVUs: 300,
    //   startRate: 0,
    //   stages: [
    //     { duration: '60s', target: 1000 },
    //     { duration: '30s', target: 3000 },
    //     { duration: '10s', target: 3000 },
    //   ],
    // },
  },
}

export function home_page() {
  http.get('http://localhost:3000/app/index')
  sleep(0.1)
}

// export function party_page() {}
