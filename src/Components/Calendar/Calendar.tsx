import React, { FC } from 'react';

import { Paper } from '@material-ui/core';
import { ViewState, AppointmentModel } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  Appointments,
  DateNavigator,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import { getNextDayDate } from 'services/utils/getNextDayDate';
import DayScaleCell from './DayScaleCell';
import TimeTableCell from './TimeTableCell';

interface CalendarProps {
  currentDate?: string | number | Date;
  // eslint-disable-next-line no-unused-vars
  currentDateChange?(currDate: Date): void;
  initialAppointments?: AppointmentModel[];
}

const Calendar: FC<CalendarProps> = ({ currentDate, currentDateChange, initialAppointments }) => (
  <Paper>
    <Scheduler firstDayOfWeek={1} data={initialAppointments}>
      <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
      <WeekView
        startDayHour={8}
        endDayHour={19}
        dayScaleCellComponent={DayScaleCell}
        timeTableCellComponent={props => <TimeTableCell nextDayDate={getNextDayDate()} {...props} />}
      />
      <Toolbar />
      <DateNavigator />
      <Appointments />
      <AppointmentTooltip />
    </Scheduler>
  </Paper>
);

export default Calendar;
