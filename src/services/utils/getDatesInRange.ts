interface DateRangeProps {
  startDate: Date;
  endDate: Date;
}

export const getDatesInRange = ({ startDate, endDate }: DateRangeProps): Date[] => {
  let dates: Date[] = [];
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, endDate];
  return dates;
};
