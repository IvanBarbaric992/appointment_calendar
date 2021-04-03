import { useEffect, useRef, useState } from 'react';
import { AppointmentModel, ChangeSet } from '@devexpress/dx-react-scheduler';
import Calendar from 'Components/Calendar';

import { getInitialRandomAppointments } from 'services/utils/generateRandomReservedDates';
import { getNextDayDate } from 'services/utils/getNextDayDate';
import Dialog from 'Components/Dialog/Dialog';
import { getMondayDate } from 'services/utils/getMondayDate';

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(getNextDayDate());
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [openModal, setOpenModal] = useState({ isOpened: false, title: '', message: '' });
  const newAppointments = useRef<AppointmentModel[]>([]);
  const handleCurrentDateChange = (currDate: Date): void => {
    if (currDate > getNextDayDate()) {
      setCurrentDate(getMondayDate(currDate));
    } else {
      setCurrentDate(getNextDayDate());
    }
    newAppointments.current = [];
  };

  const handleDoubleClick = (e: never, onDoubleClick: () => unknown, startDate: Date) => {
    if (
      !newAppointments.current.find(x => (x.startDate as Date).getDate() === startDate.getDate()) &&
      newAppointments.current.length < 2
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
      setOpenModal(prevState => ({
        ...prevState,
        isOpened: true,
        title: 'Warning',
        message: 'Appointment is in read-only mode and can not be changed or deleted!',
      }));
    }
  };

  useEffect(() => {
    console.log(currentDate);
    if (
      currentDate >= getNextDayDate() &&
      !(currentDate.getDay() === 0 || (currentDate.getDay() === 6 && currentDate.getDate() % 2 !== 0))
    ) {
      setAppointments(getInitialRandomAppointments({ nextDayDate: currentDate }));
    } else {
      setOpenModal(prevState => ({
        ...prevState,
        isOpened: true,
        title: 'Note',
        message: 'No available appointment dates in this week, switch to next one on date navigator!',
      }));
    }
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
