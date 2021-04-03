export const getNextDayDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const tomorrow = new Date(today.setHours(0, 0, 0, 0));
  return new Date(tomorrow.setDate(tomorrow.getDate() + 1));
};
