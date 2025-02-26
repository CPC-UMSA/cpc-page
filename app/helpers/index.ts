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
  if (judge === Judge.CUSTOMER || force) {
    return key;
  }
  return getProblemJudgeKey(judge, key);
};

export const disableOutOfRange = (date: Date, start: Date, end: Date) => ({
  year: !date.isWithinInterval({
    start: start.startOfYear(),
    end: end.endOfYear(),
  }, '[]'),
  month: !date.isWithinInterval({
    start: start.startOfMonth(),
    end: end.endOfMonth(),
  }, '[]'),
  day: !date.isWithinInterval({
    start: start.startOfDay(),
    end: end.endOfDay(),
  }, '[]'),
  hours: !date.isWithinInterval({
    start: start.startOfHour(),
    end: end.endOfHour(),
  }, '[]'),
  minutes: !date.isWithinInterval({
    start: start.startOfMinute(),
    end: end.endOfMinute(),
  }, '[]'),
  seconds: !date.isWithinInterval({
    start: start.startOfSecond(),
    end: end.endOfSecond(),
  }, '[]'),
});

export * from './commons';
