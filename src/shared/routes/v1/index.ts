import { Router } from 'express';
import { schedulesRoutes } from './schedules.routes';

const routes = Router();
routes.use('/schedules', schedulesRoutes)
export { routes as routesApi }
