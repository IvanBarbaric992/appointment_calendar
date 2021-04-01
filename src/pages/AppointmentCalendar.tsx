import { useEffect, useRef, useState } from 'react';
import { AppointmentModel, ChangeSet } from '@devexpress/dx-react-scheduler';
import Calendar from 'Components/Calendar';

import { getInitialRandomAppointments } from 'services/utils/generateRandomReservedDates';
import { getNextDayDate } from 'services/utils/getNextDayDate';
import Dialog from 'Components/Dialog/Dialog';

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(getNextDayDate());
  const [appointments, setAppointments] = useState<AppointmentModel[]>(
    getInitialRandomAppointments({ nextDayDate: currentDate })
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const newAppointments = useRef<AppointmentModel[]>([]);
  const handleCurrentDateChange = (currDate: Date): void => {
    if (currDate.getDate() !== new Date().getDate() && currDate.getDay() !== 1) {
      setCurrentDate(
        new Date(currDate.getFullYear(), currentDate.getMonth(), currDate.getDate() - ((currDate.getDay() + 6) % 7))
      );
    } else {
      setCurrentDate(getNextDayDate());
    }
  };

  const handleDoubleClick = (e: never, onDoubleClick: () => unknown, startDate: Date) => {
    if (
      !newAppointments.current.find(x => (x.startDate as Date).getDate() === startDate.getDate()) &&
      newAppointments.current.length < 2
    ) {
      onDoubleClick();
    }
  };

  const handleCloseDialog = () => {
    setOpenModal(false);
  };

  const handleCommitChanges = ({ added, changed, deleted }: ChangeSet): void => {
    if (added) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const newAppointmentId = appointments.length > 0 ? +appointments[appointments.length - 1].id! + 1 : 0;
      setAppointments(prevState => [...prevState, { id: newAppointmentId, ...added } as AppointmentModel]);
      newAppointments.current = [...newAppointments.current, { id: newAppointmentId, ...added } as AppointmentModel];
    } else if (changed && !appointments.find(x => x.id && changed[x.id])?.isReadOnly) {
      setAppointments(prevState => prevState.map(x => (x.id && changed[x.id] ? { ...x, ...changed[x.id] } : x)));
      newAppointments.current = newAppointments.current.map(x =>
        x.id && changed[x.id] ? { ...x, ...changed[x.id] } : x
      );
    } else if (deleted && !appointments.find(x => x.id === deleted)?.isReadOnly) {
      setAppointments(prevState => prevState.filter(x => x.id !== deleted));
      newAppointments.current = newAppointments.current.filter(x => x.id !== deleted);
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    setAppointments(getInitialRandomAppointments({ nextDayDate: currentDate }));
  }, [currentDate]);

  return (
    <>
      <Calendar
        commitChanges={handleCommitChanges}
        currentDateChange={handleCurrentDateChange}
        initialAppointments={appointments}
        handleDoubleClick={handleDoubleClick}
      />
      {openModal ? <Dialog onClose={handleCloseDialog} open={openModal} /> : null}
    </>
  );
};

export default AppointmentCalendar;
