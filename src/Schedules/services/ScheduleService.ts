import { v4 as uuidv4 } from 'uuid';

import { addDays, format, getDay, isBefore, isEqual, nextDay, parse } from 'date-fns';
import { DayAndDayOfTheWeek, DaysOfTheWeek, Intervals, Schedule, Type } from '../interfaces/Schedule';
import { readJson, writeJson } from '../../shared/database/ManipulateJson';
import { AppError } from '../../shared/errors/AppError';
import { ScheduleAvailable } from '../interfaces/ScheduleAvailable';
import { DaysOfTheWeekEnum } from '../../shared/enums/days-of-the-week.enum';

class ScheduleService {
  addNewSchedule(
      type: Type,
      intervals: Intervals[],
      day?: string,
      daysOfTheWeek?: DaysOfTheWeek[]
    ): Schedule {
     const scheduleType = {
      SpecificDay: { id: uuidv4(), type, day, intervals },
      Weekly:  { id: uuidv4(), type, daysOfTheWeek, intervals },
      Daily:  { id: uuidv4(), type, intervals },
    }
    const newSchedule: Schedule  = scheduleType[type]
    const data = readJson<Schedule[]>()
    data.push(newSchedule)
    writeJson<Schedule[]>(data)
    return newSchedule
  }

  deleteSchedule(
    id: string
  ): void {
    const data = readJson<Schedule[]>()
    const newSchedule = data.filter(schedule => schedule.id !== id)
    if (data.length === newSchedule.length) {
      throw new AppError('Schedule rule not found')
    }
    writeJson<Schedule[]>(newSchedule)
  }

  getScheduleByDay(
    startDay: string,
    endDay: string,
  ): ScheduleAvailable []{
    const numberToDayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dates: DayAndDayOfTheWeek[] = []
    for(
      let date = startDay;
      date === endDay || isBefore(parse(date, 'dd-MM-yyyy', new Date()), parse(endDay, 'dd-MM-yyyy', new Date()));
      date = format(addDays(parse(date, 'dd-MM-yyyy', new Date()), 1), 'dd-MM-yyyy')
    ) {
      const dayOfWeekNumber = getDay(parse(date, 'dd-MM-yyyy', new Date()))
      dates.push({day: date, daysOfTheWeek: numberToDayOfTheWeek[dayOfWeekNumber]})
    }
    const Schedules = readJson<Schedule[]>()
    return dates.map(date => {
      const intervals: Intervals[] = []
      Schedules.map(schedule => {
        const intervalByType =  this.getIntervalByType(schedule, date)
        if (intervalByType) {
          intervals.push(...intervalByType)
        }
      })
      return {
        day: date.day,
        intervals: intervals
      }
    })
  }
  getIntervalByType(schedule:Schedule, date: DayAndDayOfTheWeek): Intervals[] | undefined {
    const scheduleType = {
      SpecificDay: date.day === schedule.day ? schedule.intervals : undefined,
      Weekly:  schedule.daysOfTheWeek?.includes(date.daysOfTheWeek as DaysOfTheWeek) ? schedule.intervals : undefined,
      Daily:  schedule.intervals,
    }
    return scheduleType[schedule.type]
  }
}

export { ScheduleService }
