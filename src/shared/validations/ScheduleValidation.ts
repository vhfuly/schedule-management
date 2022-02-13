import { isMatch, isBefore, parse } from 'date-fns';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError';
import { DaysOfTheWeekEnum } from '../enums/days-of-the-week.enum';
import { Schedule } from '../../Schedules/interfaces/Schedule';

const  scheduleValidation = {
  scheduleType: async (request: Request, response: Response , next: NextFunction) => {
    const { type, day, intervals, daysOfTheWeek }: Schedule = request.body

    try {
      switch (type) {
        case 'SpecificDay':
          if(day && !isMatch(day, 'dd-MM-yyyy')) {
            throw new AppError('You must enter a date in the format DD-MM-YYYY');
          }
          break;
        case 'Weekly':
         if(daysOfTheWeek ? !DaysOfTheWeekEnum[daysOfTheWeek] : true) {
            throw new AppError('The daysOfTheWeek must be specified');
          }
          break;
        case 'Daily':
          break;
        default:
          throw new AppError('Schedule type not found');
      }
      const isOutOfTheNorm =  intervals.every(interval => {
        return isMatch(interval.end, 'HH:mm') && isMatch(interval.start, 'HH:mm')
      })
      if(!isOutOfTheNorm) {
        throw new AppError('You must enter a hour in the format HH:MM');
      }
      next()
    } catch (error) {
      next(error);
    }
  },
  date: async (request: Request, response: Response , next: NextFunction) => {
    const { startDay, endDay } = request.body
    try {
      if(!isMatch(endDay, 'dd-MM-yyyy') && !isMatch(startDay, 'dd-MM-yyyy')) {
        throw new AppError('You must enter a date in the format DD-MM-YYYY');
      }

      if(isBefore(parse(endDay, 'dd-MM-yyyy', new Date()),parse(startDay, 'dd-MM-yyyy', new Date()))) {
        throw new AppError('Start Day cannot be a date before end Day');
      }
      next()
    } catch (error) {
      next(error);
    }
  }
}

export { scheduleValidation }
