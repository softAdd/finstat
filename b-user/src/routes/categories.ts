import { json, Router, Response } from 'express';
import { authenticateToken, getUserByToken } from './utils';
import { findCategories, createCategories, removeCategory, pushCategory } from '../queries/categories';
import { CategoryType } from '../schemas/Category';

const categoriesRouter = Router();

categoriesRouter.use(json());
categoriesRouter.use(authenticateToken);

categoriesRouter.get('/categories', async (req, res) => {
  try {
    const user = await getUserByToken(req);
    user ? await sendCategories(user.name, res) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

categoriesRouter.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByToken(req);

    if (user) {
      await removeCategory(user.name, id);
      res.sendStatus(200);
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

categoriesRouter.post('/categories', async (req, res) => {
  try {
    const category = req.body as Pick<CategoryType, 'name' | 'type'>;
    const user = await getUserByToken(req);
    
    if (user) {
      await pushCategory(user.name, { ...category, default: false });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

async function sendCategories(login: string, res: Response) {
  const categories = await findCategories(login);

  if (!categories) {
    await createCategories(login);
    const createdCategories = await findCategories(login);
    res.send(createdCategories);
  } else {
    res.send(categories);
  }
}

export default categoriesRouter;