import fs from 'fs';
import { Schedule } from '../models/Schedule';

export const readJson = (): Schedule[] => {
  const data = fs.readFileSync('./src/schedules.json', 'utf-8');
  const scheduleDb: Schedule[] = JSON.parse(data)
  return scheduleDb
}

export const writeJson = (newDate: Schedule[]): void => {
  fs.writeFileSync('./src/schedules.json', JSON.stringify(newDate, null, 2),  'utf-8');
}
