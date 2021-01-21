import { json, Router, Response } from 'express';
import { findUserHistory, createUserHistory, addHistoryRecord, removeHistoryRecord } from '../queries/history';
import { authenticateToken, getUserByToken } from './utils';
import { HistoryRecordType } from '../schemas/HistoryRecord';

const historyRouter = Router();

historyRouter.use(json());
historyRouter.use(authenticateToken);

historyRouter.get('/history', async (req, res) => {
  try {
    const user = await getUserByToken(req);
    user ? await sendHistory(user.name, res) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
});

historyRouter.post('/history', async (req, res) => {
  try {
    const historyRecord = req.body as HistoryRecordType;
    const user = await getUserByToken(req);

    if (user) {
      await addHistoryRecord(user.name, historyRecord)
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

historyRouter.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByToken(req);

    if (user) {
      await removeHistoryRecord(user.name, id);
      res.sendStatus(200);
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

async function sendHistory(login: string, res: Response) {
  const history = await findUserHistory(login);

  if (!history) {
    await createUserHistory(login);
    const createdHistory = await findUserHistory(login);
    res.send(createdHistory);
  } else {
    res.send(history);
  }
} 

export default historyRouter;