/* eslint-disable no-unused-vars */
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import { getNextDayDate } from 'services/utils/getNextDayDate';

interface ExtendedTimeTableCellProps extends WeekView.TimeTableCellProps {
  handleDoubleClick(d: unknown, callback?: (e: unknown) => void, startDate?: Date): void;
  currentDate: Date;
}

const TimeTableCell = ({ handleDoubleClick, currentDate, ...restProps }: ExtendedTimeTableCellProps) => {
  const { startDate, onDoubleClick } = restProps;

  if (startDate?.getDay() === 0 || (startDate?.getDay() === 6 && startDate?.getDate() % 2 !== 0)) {
    return <WeekView.TimeTableCell {...restProps} className="day--weekend" />;
  }
  if (
    (startDate && new Date(startDate.toDateString()) < new Date(getNextDayDate().toDateString())) ||
    (startDate && startDate?.getDate() % 2 === 0 && startDate?.getHours() >= 14) ||
    (startDate && startDate?.getDate() % 2 !== 0 && startDate?.getHours() < 13)
  ) {
    return <WeekView.TimeTableCell {...restProps} className="time--not-available" />;
  }

  if (startDate && (startDate?.getHours() === 11 || startDate?.getHours() === 16) && startDate?.getMinutes() < 30) {
    return (
      <WeekView.TimeTableCell {...restProps} className="time--rest">
        Lunch break
      </WeekView.TimeTableCell>
    );
  }
  return <WeekView.TimeTableCell {...restProps} onDoubleClick={d => handleDoubleClick(d, onDoubleClick, startDate)} />;
};

export default TimeTableCell;
