import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {

  scenarios: {
    test1:{
      executor: 'constant-vus',
      vus: 10,
      duration: '5m',
      exec: 'loadGetResearch'
    },
    test2:{
      executor: 'constant-vus',
      vus: 100,
      duration: '5m',
      exec: 'loadGetResearch'
    },
    test3:{
      executor: 'constant-vus',
      vus: 1000,
      duration: '15m',
      exec: 'loadGetResearch'
    },
    test4:{
      executor: 'constant-vus',
      vus: 10000,
      duration: '15m',
      exec: 'loadGetResearch'
    },
    test5:{
      executor: 'constant-vus',
      vus: 1000,
      duration: '30m',
      exec: 'loadGetResearch'
    },
    test6:{
      executor: 'constant-vus',
      vus: 10000,
      duration: '30m',
      exec: 'loadGetResearch'
    },

  }

};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}


export function loadGetResearch() {
  http.get('http://127.0.0.1:8080/researches');
  sleep(1);
}
