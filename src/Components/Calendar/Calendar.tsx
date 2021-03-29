import React, { FC } from 'react';

import { Paper } from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

interface CalendarProps {
  currentDate?: string | number | Date;
  currentDateChange?: () => void;
}

const Calendar: FC<CalendarProps> = ({ currentDate, currentDateChange }) => (
  <Paper>
    <Scheduler height={660}>
      <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
      <WeekView startDayHour={8} endDayHour={19} />
      <Toolbar />
      <DateNavigator />
      <TodayButton />
      <Appointments />
    </Scheduler>
  </Paper>
);

export default Calendar;
