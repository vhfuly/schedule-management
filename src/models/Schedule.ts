export interface Intervals {
  start: string;
  end: string;
}

export type Type= 'SpecificDay' | 'Daily' | 'Weekly'

export type DaysOfTheWeek= 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday'| 'Friday' | 'Saturday'

export interface Schedule {
  id: string;
  userId: string;
  type: Type;
  day?: string;
  daysOfTheWeek?: DaysOfTheWeek;
  intervals: Intervals[];
}
