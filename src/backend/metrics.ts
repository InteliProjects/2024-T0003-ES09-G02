import express, { Request, Response } from "express";
import client from "prom-client";
import cors from "cors"

const app = express();
let activeUsers: number = 0;
let responseTime: number = 0;


export const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"],
});

export const requestCounter = new client.Counter({
  name: 'app_requests_total',
  help: 'Total number of requests',
});

export const activeUsersCounter = new client.Counter({
  name: 'active_users_total',
  help: 'Total number of active users',
});

export const loadTimeHistogram = new client.Histogram({
  name: 'load_time_seconds',
  help: 'Load time of screens in seconds',
  labelNames: ['route'],
});

export const satisfactionRate = new client.Histogram({
  name: 'satisfaction_rate',
  help: 'Satisfaction rate of users',
  buckets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
});

export const responseTimeHistogram = new client.Histogram({
  name: 'response_time_seconds',
  help: 'Response time of surveys in seconds',
  buckets: [30, 60, 90, 120, 150, 180], // Define os intervalos de tempo em segundos
});

export const clientRequestCount = new client.Counter({
  name: 'client_request_count',
  help: 'Number of requests made by each client',
});
  
export function startMetricsServer() {
    const collectDefaultMetrics = client.collectDefaultMetrics;

    collectDefaultMetrics();

    app.use(express.json()); // Adiciona middleware para processar o corpo da requisição como JSON
    app.use(cors())
    app.get("/metrics", async (req, res) => {
      res.set("Content-Type", client.register.contentType);
      return res.send(await client.register.metrics());
    });

    app.post('/updateActiveUsersMetric', (req: Request, res: Response) => {
      const newValue = req.body.value;
      activeUsers = newValue;
      activeUsersCounter.inc(activeUsers);
      res.send('[backend] ActiveUsers updated successfully');
    });

    app.post('/updateSatisfactionRateMetric', (req, res) => {
      const newValue = req.body.value;
      satisfactionRate.observe(newValue);
      res.send('[backend] SatisfactionRate updated successfully');
    })

    app.post('/updateLoadTimeMetric', (req: Request, res: Response) => {
      const loadTime = req.body.loadTime;
      const route = req.body.route;
      console.log("cheguei aq" + loadTime + route)
      // Registra o tempo de carregamento no histograma
      loadTimeHistogram.labels(route).observe(loadTime);
      res.sendStatus(200); // Responde com status 200 para indicar que a requisição foi processada com sucesso
    });

    app.post('/updateSearchResponseTimeMetric', (req: Request, res: Response) => {
      const responseTime = req.body.responseTime;
      responseTimeHistogram.observe(responseTime / 1000);
      clientRequestCount.inc(responseTime);
      res.send(`[backend] Metrics for ${responseTime} updated successfully`);
    });

    app.listen(9100, () => {
      console.log("Metrics server started at http://localhost:9100");
    });
  }
