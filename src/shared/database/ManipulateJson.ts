import fs from 'fs';
import path from 'path';

const schedulesPath = path.format({ root: './src/shared/database', name: '/schedules', ext: '.json' });

export function readJson<T>(): T[]{
  try{
    const data = fs.readFileSync(schedulesPath, 'utf-8');
    const scheduleDb: T[] = JSON.parse(data)
    return scheduleDb
  } catch {
    throw new Error('unresponsive database')
  }
}

export function writeJson<T>(newDate: T[]): void {
  try{
    fs.writeFileSync(schedulesPath, JSON.stringify(newDate, null, 2),  'utf-8');
  } catch {
    throw new Error('unresponsive database')
  }
}
