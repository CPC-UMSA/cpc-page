// commons 0.2 dropped the Date.prototype extensions in favour of standalone helpers
import {
  endOfDay,
  endOfHour,
  endOfMinute,
  endOfMonth,
  endOfSecond,
  endOfYear,
  isWithinInterval,
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfSecond,
  startOfYear,
} from '@juki-team/commons/helpers';
import { ButtonLoaderOnClickType, Judge, Status } from '~/types';
import { getProblemJudgeKey } from './commons';

export const buttonLoaderLink = (fun: (() => Promise<any>) | (() => any)): ButtonLoaderOnClickType => async (setLoader) => {
  setLoader(Status.LOADING);
  await fun();
  setLoader(Status.SUCCESS);
};

export const roundTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  date.setSeconds(0, 0);
  return date.getTime();
};

export const getSimpleProblemJudgeKey = (judge: Judge, key: string, force?: boolean) => {
  if (judge === Judge.JUKI_JUDGE || force) {
    return key;
  }
  return getProblemJudgeKey(judge, key);
};

export const disableOutOfRange = (date: Date, start: Date, end: Date) => ({
  year: !isWithinInterval(date, {
    start: startOfYear(start),
    end: endOfYear(end),
  }, '[]'),
  month: !isWithinInterval(date, {
    start: startOfMonth(start),
    end: endOfMonth(end),
  }, '[]'),
  day: !isWithinInterval(date, {
    start: startOfDay(start),
    end: endOfDay(end),
  }, '[]'),
  hours: !isWithinInterval(date, {
    start: startOfHour(start),
    end: endOfHour(end),
  }, '[]'),
  minutes: !isWithinInterval(date, {
    start: startOfMinute(start),
    end: endOfMinute(end),
  }, '[]'),
  seconds: !isWithinInterval(date, {
    start: startOfSecond(start),
    end: endOfSecond(end),
  }, '[]'),
});

export * from './commons';
