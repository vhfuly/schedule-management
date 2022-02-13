import { NextFunction, Request, Response } from 'express';
import { readJson } from '../../shared/database/ManipulateJson';
import { Schedule } from '../interfaces/Schedule';
import { ScheduleService } from '../services/ScheduleService';

const scheduleService = new ScheduleService();

class ScheduleRuleController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const data = readJson<Schedule[]>()
      response.json(data)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { type, day, intervals, daysOfTheWeek } = request.body
      const newSchedule = scheduleService.addNewSchedule(type,intervals, day, daysOfTheWeek);
      response.json(newSchedule);
    } catch (error) {
      next(error)
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params
      scheduleService.deleteSchedule(id);
      response.json({message: 'ok'});
    } catch (error) {
      next(error)
    }
  }
}

export { ScheduleRuleController }
