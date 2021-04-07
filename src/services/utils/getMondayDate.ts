export const getMondayDate = (currentDate: Date) => {
  const dayInWeek = currentDate.getDay();
  const monday = currentDate.getDate() - dayInWeek + (dayInWeek === 0 ? -6 : 1);
  const currentDateCopy = new Date(currentDate.valueOf());

  return new Date(currentDateCopy.setDate(monday));
};
