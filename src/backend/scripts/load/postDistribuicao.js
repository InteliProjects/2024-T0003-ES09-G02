import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: '10s',

};

export default function() {
    let payload = {
        name: 'Nome da pesquisa',
        channel: 'Whatsapp',
        anonymous_awnser: true,
        csv_file: 'string',
        template: 'string',
        research_id: "5e184831-5c7c-46da-9143-33f5945cfdd6"
      };
    
      let headers = {
        'Content-Type': 'application/json',
      };
    
    let res = http.post('http://localhost:8080/distribuitions/', JSON.stringify(payload), { headers: headers });
    
    check(res, {
        'status is 201': (r) => r.status === 201,
    });    
  sleep(1);
}