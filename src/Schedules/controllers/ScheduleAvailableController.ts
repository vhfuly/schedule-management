import { NextFunction, Request, Response } from 'express';
import { readJson } from '../../shared/database/ManipulateJson';
import { Schedule } from '../interfaces/Schedule';
import { ScheduleService } from '../services/ScheduleService';

const scheduleService = new ScheduleService();

class ScheduleAvailableController {
  async index(request: Request, response: Response, next: NextFunction) {
    const { startDay, endDay } = request.body
    try {
      const scheduleAvailable = scheduleService.getScheduleByDay(startDay, endDay)
      response.json(scheduleAvailable)
    } catch (error) {
      next(error)
    }
  }
}

export { ScheduleAvailableController }
