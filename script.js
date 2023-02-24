import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 900 },
    { duration: '1m', target: 900 },
    { duration: '10s', target: 1000 },
    { duration: '1m', target: 1000 },
    { duration: '10s', target: 1100 },
    { duration: '1m', target: 1100 },
    { duration: '10s', target: 1200 },
    { duration: '1m', target: 1200 },
    { duration: '10s', target: 1300 },
    { duration: '1m', target: 1300 },
    { duration: '10s', target: 1400 },
    { duration: '1m', target: 1400 },
  ],
  thresholds: {
    http_req_duration: [{ threshold: 'p(95) < 2000', abortOnFail: true }],
    http_req_failed: [{ threshold: 'rate < 0.01', abortOnFail: true }],
  },
};

export default function () {
  http.get('http://localhost:3001/qa/questions/340098/answers');
  sleep(1);
}
