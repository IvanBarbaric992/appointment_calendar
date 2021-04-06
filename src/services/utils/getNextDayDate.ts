export const getNextDayDate = () => {
  const today = new Date();
  const tomorrow = new Date(today.setHours(0, 0, 0, 0));
  // tomorrow.setDate(tomorrow.getDate() + 6);
  return new Date(tomorrow.setDate(tomorrow.getDate() + 1));
};
