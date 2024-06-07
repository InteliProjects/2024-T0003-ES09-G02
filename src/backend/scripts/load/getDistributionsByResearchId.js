import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',  
};

export default function() {
    http.get('http://127.0.0.1:8080/distribuitions/research/3605e97f-331c-4c2a-b59e-e04c29e814ed');
    sleep(1);
}