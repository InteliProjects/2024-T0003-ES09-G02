import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10000, // equivalente a 10 mil usuarios
  duration: '1800s', // equivalente a 30 minutos
};

export default function() {
    let payload = {
        name: 'Nome da pesquisa',
        identifier: 'Identificador da pesquisa',
      };
    
      let headers = {
        'Content-Type': 'application/json',
      };
    
    let res = http.post('http://localhost:8080/researches', JSON.stringify(payload), { headers: headers });
    
    check(res, {
        'status is 201': (r) => r.status === 201,
    });    
  sleep(1);
}
