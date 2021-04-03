export const getMondayDate = (currentDate: Date) => {
  const dayInWeek = currentDate.getDay();
  const monday = currentDate.getDate() - dayInWeek + (dayInWeek === 0 ? -6 : 1);
  return new Date(currentDate.setDate(monday));
};
