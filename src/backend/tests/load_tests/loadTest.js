const axios = require('axios');

async function sendRequest(url, numberOfRequests) {
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < numberOfRequests; i++) {
    axios.get(url)
      .then(() => successCount++)
      .catch(() => errorCount++)
      .finally(() => {
        if (i === numberOfRequests - 1) {
          console.log(`Teste concluído com ${numberOfRequests} requisições.`);
          console.log(`Sucessos: ${successCount}, Erros: ${errorCount}`);
        }
      });
  }
}

const URL = "https:localhost:8080/:id";
const NUMERO_DE_REQUISICOES = 1000;

sendRequest(URL, NUMERO_DE_REQUISICOES);
