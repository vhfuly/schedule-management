import { ScheduleController } from '../../../Schedules/controllers/ScheduleController';
import { Router } from 'express';

const scheduleController = new ScheduleController();

const routes = Router();

routes.get('/', scheduleController.index);
routes.post('/', scheduleController.store);

export { routes as schedulesRoutes }
