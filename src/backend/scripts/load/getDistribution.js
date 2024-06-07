import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {

  scenarios: {
    test1:{
      executor: 'constant-vus',
      vus: 10,
      duration: '5m',
      exec: 'loadGetDistribution'
    },
    test2:{
      executor: 'constant-vus',
      vus: 100,
      duration: '5m',
      exec: 'loadGetDistribution'
    },
    test3:{
      executor: 'constant-vus',
      vus: 1000,
      duration: '15m',
      exec: 'loadGetDistribution'
    },
    test4:{
      executor: 'constant-vus',
      vus: 10000,
      duration: '15m',
      exec: 'loadGetDistribution'
    },
    test5:{
      executor: 'constant-vus',
      vus: 1000,
      duration: '30m',
      exec: 'loadGetDistribution'
    },
    test6:{
      executor: 'constant-vus',
      vus: 10000,
      duration: '30m',
      exec: 'loadGetDistribution'
    },

  }

};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}


export function loadGetDistribution() {
  http.get('http://127.0.0.1:8080/distribuitions');
  sleep(1);
}
