import { ScheduleRuleController } from '../../../Schedules/controllers/ScheduleRuleController';
import { Router } from 'express';
import { scheduleValidation } from '../../validations/ScheduleValidation';
import { ScheduleAvailableController } from '../../../Schedules/controllers/ScheduleAvailableController';

const scheduleRuleController = new ScheduleRuleController();
const scheduleAvailableController  = new ScheduleAvailableController()
const routes = Router();

routes.get('/available', scheduleValidation.date, scheduleAvailableController.index);

routes.get('/', scheduleRuleController.index);
routes.post('/', scheduleValidation.scheduleType, scheduleRuleController.create);
routes.delete('/:id', scheduleRuleController.delete);


export { routes as schedulesRoutes }
