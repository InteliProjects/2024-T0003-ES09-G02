import express, { Request, Response } from "express";
import researchRoutes from "./routes/ResearchRoutes";
import distribuitionRoutes from "./routes/DistributionRoutes"
import answersRoutes from "./routes/AnswersRoutes";
import responseTime from "response-time";
import { PrismaClient } from '@prisma/client'
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';
import cors from 'cors';
import {
  restResponseTimeHistogram,
  requestCounter,
  startMetricsServer,
  activeUsersCounter,
  clientRequestCount,
  responseTimeHistogram,
} from "./metrics";



export const prisma = new PrismaClient()
const app = express();
const port = 8080;


app.use(cors());
app.use(express.json());
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    responseTimeHistogram.observe(time / 1000);
  })
);
app.use((req: Request, res: Response, next) => {
  requestCounter.inc();
  next();
});
app.use((req: Request, res: Response, next) => {
  activeUsersCounter.inc();
  next();
});
app.use((req: Request, res: Response, next) => {
  clientRequestCount.inc();
  next();
});
app.use('/researches', researchRoutes);
app.use('/distribuitions', distribuitionRoutes)
app.use('/answers', answersRoutes);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));


app.listen(port, () => {
  startMetricsServer();
  console.log(`Listening on port ${port}...`);
}); 