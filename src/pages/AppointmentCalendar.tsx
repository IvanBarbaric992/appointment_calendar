import Calendar from 'Components/Calendar';
import { useRef } from 'react';

import { getInitialRandomAppointments } from 'services/utils/generateRandomReservedDates';
import { getNextDayDate } from 'services/utils/getNextDayDate';

const AppointmentCalendar = () => {
  const nextDayDate = useRef<Date>(getNextDayDate());
  return <Calendar initialAppointments={getInitialRandomAppointments({ nextDayDate: nextDayDate.current })} />;
};

export default AppointmentCalendar;

// endDate: new Date(tomorrowDate.getTime() + 30 * 60000),
