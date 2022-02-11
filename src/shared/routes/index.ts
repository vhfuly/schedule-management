import { Router } from 'express';
import { routesApi } from './v1';

const routes = Router();
routes.use('/v1/api', routesApi)
export { routes }
