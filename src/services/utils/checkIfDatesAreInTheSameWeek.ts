export const checkIfDatesAreInTheSameWeek = ({ firstDate, secondDate }: { firstDate: Date; secondDate: Date }) => {
  const utc1 = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
  const utc2 = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());
  const numberOfWeeksBetweenDates = Math.abs(Math.round((utc1 - utc2) / (7 * 24 * 60 * 60 * 1000)));
  if (numberOfWeeksBetweenDates === 0) {
    return true;
  }
  return false;
};
