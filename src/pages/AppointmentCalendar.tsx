import { useEffect, useState } from 'react';
import { AppointmentModel, ChangeSet } from '@devexpress/dx-react-scheduler';

import Calendar from 'Components/Calendar';
import Dialog from 'Components/Dialog/Dialog';

import { getInitialRandomAppointments } from 'services/utils/generateRandomAppointments';
import { getNextDayDate } from 'services/utils/getNextDayDate';
import { checkIfDatesAreInTheSameWeek } from 'services/utils/checkIfDatesAreInTheSameWeek';
import { getMondayDate } from 'services/utils/getMondayDate';

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(() => getNextDayDate());
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [openModal, setOpenModal] = useState({ isOpened: false, title: '', message: '' });
  const handleCurrentDateChange = (nextDate: Date): void => {
    if (nextDate.getDay() === 0 || (nextDate.getDay() === 6 && nextDate.getDate() % 2 !== 0)) {
      setOpenModal(prevState => ({
        ...prevState,
        isOpened: true,
        title: 'Note',
        message: 'You can not make an appointment on odd saturday or any sunday.',
      }));
      return;
    }
    const serverTomorrow = getNextDayDate();
    if (
      nextDate < serverTomorrow &&
      !checkIfDatesAreInTheSameWeek({ firstDate: serverTomorrow, secondDate: nextDate })
    ) {
      return;
    }
    if (
      nextDate > serverTomorrow &&
      !checkIfDatesAreInTheSameWeek({ firstDate: currentDate, secondDate: nextDate }) &&
      !checkIfDatesAreInTheSameWeek({ firstDate: serverTomorrow, secondDate: nextDate })
    ) {
      setCurrentDate(nextDate);
    } else {
      setCurrentDate(serverTomorrow);
    }
  };

  const handleDoubleClick = (e: never, onDoubleClick: () => unknown, startDate: Date) => {
    if (
      !appointments.find(x => (x.startDate as Date).getDate() === startDate.getDate() && !x.isReadOnly) &&
      appointments.filter(x => !x.isReadOnly).length < 2
    ) {
      onDoubleClick();
    } else {
      setOpenModal(prevState => ({
        ...prevState,
        isOpened: true,
        title: 'Warning',
        message: 'You are not allowed to have more than one appointment in a day or more than two in a week',
      }));
    }
  };

  const handleCloseDialog = () => {
    setOpenModal(prevState => ({
      ...prevState,
      isOpened: false,
      title: '',
      message: '',
    }));
  };

  const handleCommitChanges = ({ added, changed, deleted }: ChangeSet): void => {
    if (added) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const newAppointmentId = appointments.length > 0 ? +appointments[appointments.length - 1].id! + 1 : 0;
      setAppointments(prevState => [...prevState, { id: newAppointmentId, ...added } as AppointmentModel]);
    } else if (changed && !appointments.find(x => x.id && changed[x.id])?.isReadOnly) {
      setAppointments(prevState => prevState.map(x => (x.id && changed[x.id] ? { ...x, ...changed[x.id] } : x)));
    } else if (deleted && !appointments.find(x => x.id === deleted)?.isReadOnly) {
      setAppointments(prevState => prevState.filter(x => x.id !== deleted));
    } else {
      setOpenModal(prevState => ({
        ...prevState,
        isOpened: true,
        title: 'Warning',
        message: 'Appointment is in read-only mode and can not be changed or deleted!',
      }));
    }
  };

  useEffect(() => {
    setAppointments(
      getInitialRandomAppointments({
        nextDayDate:
          currentDate.toDateString() === getNextDayDate().toDateString() ? currentDate : getMondayDate(currentDate),
      })
    );
  }, [currentDate]);

  return (
    <>
      <Calendar
        currentDate={currentDate}
        commitChanges={handleCommitChanges}
        currentDateChange={handleCurrentDateChange}
        initialAppointments={appointments}
        handleDoubleClick={handleDoubleClick}
      />
      {openModal ? <Dialog onClose={handleCloseDialog} modal={openModal} /> : null}
    </>
  );
};

export default AppointmentCalendar;
