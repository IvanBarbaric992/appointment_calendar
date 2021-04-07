/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import { Paper } from '@material-ui/core';
import {
  ViewState,
  AppointmentModel,
  EditingState,
  ChangeSet,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  Appointments,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

import DayScaleCell from './DayScaleCell';
import TimeTableCell from './TimeTableCell';
import Legend from './Legend';
import Appointment from './Appointment';
import CustomizedAppointmentForm from './CustomizedAppointmentForm';
import CustomizedDateEditorComponent from './CustomizedDateEditorComponent';
import CustomizedBooleanComponent from './CustomizedBooleanComponent';
import CustomizedTextEditorComponent from './CustomizedTextEditorComponent';
import CustomizedTooltipLayout from './CustomizedTooltipLayout';

interface CalendarProps {
  currentDate: Date;
  currentDateChange?(currDate: Date): void;
  commitChanges(changes: ChangeSet): void;
  initialAppointments?: AppointmentModel[];
  handleDoubleClick(d: unknown, callback?: (e: any) => void, startDate?: Date): void;
}

const Calendar: FC<CalendarProps> = ({
  currentDate,
  currentDateChange,
  commitChanges,
  handleDoubleClick,
  initialAppointments,
}) => (
  <>
    <Legend />
    <Paper>
      <Scheduler firstDayOfWeek={1} data={initialAppointments}>
        <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <WeekView
          startDayHour={8}
          endDayHour={19}
          dayScaleCellComponent={DayScaleCell}
          timeTableCellComponent={props => (
            <TimeTableCell handleDoubleClick={handleDoubleClick} currentDate={currentDate} {...props} />
          )}
        />
        <Toolbar />
        <DateNavigator />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton layoutComponent={CustomizedTooltipLayout} />
        <AppointmentForm
          basicLayoutComponent={CustomizedAppointmentForm}
          textEditorComponent={CustomizedTextEditorComponent}
          dateEditorComponent={CustomizedDateEditorComponent}
          booleanEditorComponent={CustomizedBooleanComponent}
        />
      </Scheduler>
    </Paper>
  </>
);

export default Calendar;
