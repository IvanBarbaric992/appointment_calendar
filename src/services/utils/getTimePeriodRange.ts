interface TimeRangeProps {
  start: string;
  end: string;
  interval: number;
}

export const getTimePeriodRange = ({ start, end, interval }: TimeRangeProps): { [key: string]: number }[] => {
  function getMinutes(time: string): number {
    const a = time.split(':').map(Number);
    return a[0] * 60 + a[1];
  }

  const getTime = (min: number) => {
    const hour: number = Math.floor(min / 60);
    return { hour, minutes: min % 60 < 10 ? +`0${min % 60}` : min % 60 };
  };

  const rangeOfHours = [];
  let startHour = getMinutes(start);
  const endHour = getMinutes(end);

  while (startHour + interval <= endHour) {
    rangeOfHours.push(getTime(startHour));
    startHour += interval;
  }
  return rangeOfHours;
};
