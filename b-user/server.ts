import express from 'express';
import cors from 'cors';
import historyRouter from './src/routes/history';
import categoriesRouter from './src/routes/categories';
import raiffeisenRouter from './src/routes/raiffeisen';

const APP_PORT = process.env.APP_PORT || '80';

const app = express();
app.use(cors());
app.use(historyRouter);
app.use(categoriesRouter);
app.use(raiffeisenRouter);

app.listen(APP_PORT, () => console.log(`API backend listen on ${APP_PORT}`));
