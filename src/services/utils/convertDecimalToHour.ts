export const convertDecimalToHours = ({ decimal }: { decimal: number }) => {
  const hour = Math.floor(decimal);
  let decpart = decimal - hour;

  const min = 1 / 60;

  decpart = min * Math.round(decpart / min);

  let minute = `${Math.floor(decpart * 60)}`;

  if (minute.length < 2) {
    minute = `0${minute}`;
  }

  return { hour, minute: parseFloat(minute) };
};
