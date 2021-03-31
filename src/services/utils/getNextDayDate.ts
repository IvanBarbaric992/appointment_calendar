export const getNextDayDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  return new Date(tomorrow.setDate(tomorrow.getDate() + 1));
};
