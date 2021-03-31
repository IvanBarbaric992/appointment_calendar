import { useEffect, useState } from 'react';
import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import Calendar from 'Components/Calendar';

import { getInitialRandomAppointments } from 'services/utils/generateRandomReservedDates';
import { getNextDayDate } from 'services/utils/getNextDayDate';

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(getNextDayDate());
  const [initialAppointments, setInitialAppointments] = useState<AppointmentModel[]>(
    getInitialRandomAppointments({ nextDayDate: currentDate })
  );
  const handleCurrentDateChange = (currDate: Date): void => {
    if (currDate.getDate() !== new Date().getDate() && currDate.getDay() !== 1) {
      setCurrentDate(
        new Date(currDate.getFullYear(), currentDate.getMonth(), currDate.getDate() - ((currDate.getDay() + 6) % 7))
      );
    } else {
      setCurrentDate(getNextDayDate());
    }
  };

  useEffect(() => {
    setInitialAppointments(getInitialRandomAppointments({ nextDayDate: currentDate }));
  }, [currentDate]);

  return <Calendar currentDateChange={handleCurrentDateChange} initialAppointments={initialAppointments} />;
};

export default AppointmentCalendar;
