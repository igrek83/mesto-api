import express, { Express } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import router from './routes';

const { PORT = 3000 } = process.env;

const app: Express = express();

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {})
  .then(() => console.log('MongoDB connection connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.json());
app.use(router);
