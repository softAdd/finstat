import { Router } from 'express';
import fileupload from 'express-fileupload';
import { authenticateToken, getUserByToken, HAS_A_DATE_REGEXP, ENDS_WITH_NUMBER_REGEXP } from './utils';
import { addHistoryRecords } from '../queries/history';
import { HistoryRecordType } from '../schemas/HistoryRecord';

const raiffeisenRouter = Router();

raiffeisenRouter.use(authenticateToken);
raiffeisenRouter.use(fileupload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

raiffeisenRouter.post('/raiffeisen/upload', async (req, res) => {
  const file = req?.files?.report;

  if (!file || Array.isArray(file)) {
    res.sendStatus(400);
    return;
  }

  try {
    const user = await getUserByToken(req);

    if (user) {
      const fileText = file.data.toString('utf8');
      const rowsFromText = fileText.split('\n');
      const rowsWithDate = rowsFromText.filter((row) => HAS_A_DATE_REGEXP.test(row) && ENDS_WITH_NUMBER_REGEXP.test(row));
      // ts ignore is used below because it's checked on the previous line
      const historyRecords: HistoryRecordType[] = rowsWithDate.map((row) => {
        // @ts-ignore
        const sum = Number(row.match(ENDS_WITH_NUMBER_REGEXP)[0].replace(' ', ''));
        // @ts-ignore
        const date = row.match(HAS_A_DATE_REGEXP)[0];
      
        return {
          sum,
          date,
          category: `Raiffeisen, ${sum < 0 ? 'трата' : 'доход'}`
        }
      });
      await addHistoryRecords(user.name, historyRecords);
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default raiffeisenRouter;