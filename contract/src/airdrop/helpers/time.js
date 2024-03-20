const ONE_THOUSAND = 1_000;
const SIXTY = 60;

const multiply = (x) => (y) => x * y;
const secondsToMilliseconds = (seconds) => seconds * ONE_THOUSAND;
const oneMinute = secondsToMilliseconds(60);
const oneHour = multiply(oneMinute)(60);
const oneDay = multiply(oneHour)(24);
const oneWeek = multiply(oneDay)(7);

const TIME_RANGES_IN_MS = {
  ONE_DAY: oneDay * 1000,
  ONE_WEEK: oneWeek * 1000,
};

export {
  oneMinute,
  oneDay,
  oneWeek,
  ONE_THOUSAND,
  SIXTY,
  secondsToMilliseconds,
  TIME_RANGES_IN_MS,
};
