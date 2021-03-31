import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

interface CustomTimeTableCellProps extends WeekView.TimeTableCellProps {
  nextDayDate: Date;
}

const TimeTableCell = (props: CustomTimeTableCellProps) => {
  const { startDate } = props;
  const { nextDayDate, ...rest } = props;
  if (startDate?.getDay() === 0 || (startDate?.getDay() === 6 && startDate?.getDate() % 2 !== 0)) {
    return <WeekView.TimeTableCell {...rest} className="day--weekend" />;
  }
  if (
    (startDate && startDate.getDay() < nextDayDate.getDay()) ||
    (startDate && startDate?.getDate() % 2 === 0 && startDate?.getHours() >= 14) ||
    (startDate && startDate?.getDate() % 2 !== 0 && startDate?.getHours() < 13)
  ) {
    return <WeekView.TimeTableCell {...rest} className="time--not-available" />;
  }

  if (startDate && (startDate?.getHours() === 11 || startDate?.getHours() === 16) && startDate?.getMinutes() < 30) {
    return (
      <WeekView.TimeTableCell {...rest} className="time--rest">
        Lunch break
      </WeekView.TimeTableCell>
    );
  }
  return <WeekView.TimeTableCell {...rest} />;
};

export default TimeTableCell;
