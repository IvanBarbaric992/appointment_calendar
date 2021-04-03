import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { convertDecimalToHours } from './convertDecimalToHour';
import { getDatesInRange } from './getDatesInRange';
import { getRange } from './getRange';

interface Props {
  nextDayDate: Date;
}

export const getInitialRandomAppointments = ({ nextDayDate }: Props) => {
  // if next day is odd saturday or sunday do not create initial appointments
  if (nextDayDate.getDay() === 0 || (nextDayDate.getDay() === 6 && nextDayDate.getDate() % 2 !== 0)) {
    return [];
  }

  const dateAfterOneWeekFromNextDayDate = new Date(
    nextDayDate.getFullYear(),
    nextDayDate.getMonth(),
    nextDayDate.getDate() + (7 - nextDayDate.getDay())
  );

  const currentWeekLeftDates = getDatesInRange({ startDate: nextDayDate, endDate: dateAfterOneWeekFromNextDayDate });
  const workingDates = currentWeekLeftDates.filter(x => {
    if (x.getDay() !== 0 && !(x.getDay() === 6 && x.getDate() % 2 !== 0)) {
      return new Date(x.setHours(0, 0, 0));
    }
    return false;
  });

  const morningWorkingHours = getRange({ from: 8, to: 13.5, step: 0.5, exclude: [11] });
  const afterNoonWorkingHours = getRange({ from: 13, to: 18.5, step: 0.5, exclude: [16] });

  let reservedDates: AppointmentModel[] = [];
  // less working days in a week left higher amount of time to generate random appointments
  // so I have choose to cut down in half possible reservations to avoid possible infinite loop
  let numberOfAppointments = 15;
  if (workingDates.length < 3) {
    numberOfAppointments = 7;
  }
  let appointmentId = 0;
  while (reservedDates.length < numberOfAppointments) {
    const random = Math.floor(Math.random() * workingDates.length);
    const randomMorningHour = Math.floor(Math.random() * morningWorkingHours.length);
    const randomAfternoonHour = Math.floor(Math.random() * afterNoonWorkingHours.length);
    let date: Date | null = workingDates[random];
    if (workingDates[random].getDate() % 2 === 0) {
      const { hour, minute } = convertDecimalToHours({ decimal: morningWorkingHours[randomMorningHour] });
      date.setHours(hour, minute);
    } else {
      const { hour, minute } = convertDecimalToHours({ decimal: afterNoonWorkingHours[randomAfternoonHour] });
      date.setHours(hour, minute);
    }

    if (!reservedDates.find(x => x.startDate.toString() === date?.toString())) {
      reservedDates = [
        ...reservedDates,
        {
          id: appointmentId,
          title: 'Reserved',
          startDate: new Date(date),
          endDate: new Date(date.setMinutes(date.getMinutes() + 30)),
          isReadOnly: true,
        },
      ]; // new Date() is necessary because of reference problems
      appointmentId += 1;
    }

    date = null;
  }

  return reservedDates;
};
