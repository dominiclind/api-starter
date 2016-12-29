import { version } from '../../package.json';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

/*import routes*/
import { me } from '../routes/user';
import { fbLogin } from '../routes/auth';

export default ({config, db}, app) => {

  const api = Router();

  /*set routes*/
	api.get('/me', authMiddleware, me);
	api.post('/auth/login', fbLogin);

  api.get('/', (req, res) => {
    res.json({
      version
    });
  });

  return api;
}