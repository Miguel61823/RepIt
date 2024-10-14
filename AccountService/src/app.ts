import express, {
  Express,
  Router,
  } from 'express';
import {RegisterRoutes} from "../build/routes";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = Router();
RegisterRoutes(router);
app.use('/', router);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;