import express, { Express } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import router from './routes';
import errorsHandler from './middleware/errors-handler';
import Config from './config';

const { PORT, MONGO_IP } = Config;
const app: Express = express();

app.use(cookieParser());
app.use(helmet());

mongoose.connect(MONGO_IP, {})
  .then(() => console.log('MongoDB connection connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.json());
app.use(router);
app.use(errorsHandler);
