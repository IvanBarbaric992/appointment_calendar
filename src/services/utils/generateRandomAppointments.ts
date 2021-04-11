import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { convertDecimalToHours } from './convertDecimalToHour';
import { getDatesInRange } from './getDatesInRange';
import { getRange } from './getRange';

interface Props {
  nextDayDate: Date;
}

export const getInitialRandomAppointments = ({ nextDayDate }: Props) => {
  // get date of last day in current week(sunday)
  const lastDateinCurrentWeek = new Date(
    nextDayDate.getFullYear(),
    nextDayDate.getMonth(),
    nextDayDate.getDate() + (7 - nextDayDate.getDay())
  );

  // get range of dates between current date and sunday
  const currentWeekLeftDates = getDatesInRange({ startDate: nextDayDate, endDate: lastDateinCurrentWeek });

  // filter out only working dates
  const workingDates = currentWeekLeftDates.filter(x => {
    if (x.getDay() !== 0 && !(x.getDay() === 6 && x.getDate() % 2 !== 0)) {
      return new Date(x.setHours(0, 0, 0));
    }
    return false;
  });

  const morningWorkingHours = getRange({ from: 8, to: 13.5, step: 0.5, exclude: [11] });
  const afterNoonWorkingHours = getRange({ from: 13, to: 18.5, step: 0.5, exclude: [16] });

  let initialAppointments: AppointmentModel[] = [];
  // less working days in a week left higher amount of time to generate random appointments
  // so I have choose to cut down in half possible reservations to avoid possible infinite loop
  const numberOfAppointments = workingDates.length > 2 ? 15 : 7;

  let appointmentId = 0;
  while (initialAppointments.length < numberOfAppointments) {
    const randomWorkingDateIndex = Math.floor(Math.random() * workingDates.length); // get random index of working dates array
    const date: Date | null = workingDates[randomWorkingDateIndex];
    const { hour, minute } = convertDecimalToHours({
      decimal:
        date.getDate() % 2 === 0
          ? morningWorkingHours[Math.floor(Math.random() * morningWorkingHours.length)]
          : afterNoonWorkingHours[Math.floor(Math.random() * afterNoonWorkingHours.length)],
    });
    date.setHours(hour, minute);
    // add new random appointment only if it is not in the same day and hour
    if (!initialAppointments.find(x => x.startDate.toString() === date?.toString())) {
      initialAppointments = [
        ...initialAppointments,
        {
          id: appointmentId,
          title: 'Reserved',
          startDate: new Date(date),
          endDate: new Date(date.setMinutes(date.getMinutes() + 30)),
          isReadOnly: true,
        },
      ];
      appointmentId += 1;
    }
  }

  return initialAppointments;
};
