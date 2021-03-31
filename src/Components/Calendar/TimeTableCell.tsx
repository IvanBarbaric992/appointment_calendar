import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

const TimeTableCell = (props: WeekView.TimeTableCellProps) => {
  const { startDate } = props;
  if (startDate?.getDay() === 0 || (startDate?.getDay() === 6 && startDate?.getDate() % 2 !== 0)) {
    return <WeekView.TimeTableCell {...props} className="day--weekend" />;
  }
  if (
    (startDate && startDate < new Date()) ||
    (startDate && startDate?.getDate() % 2 === 0 && startDate?.getHours() >= 14) ||
    (startDate && startDate?.getDate() % 2 !== 0 && startDate?.getHours() < 13)
  ) {
    return <WeekView.TimeTableCell {...props} className="time--not-available" />;
  }

  if (startDate && (startDate?.getHours() === 11 || startDate?.getHours() === 16) && startDate?.getMinutes() < 30) {
    return (
      <WeekView.TimeTableCell {...props} className="time--rest">
        Lunch break
      </WeekView.TimeTableCell>
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

export default TimeTableCell;
