import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

import './Calendar.scss';

interface ExtendedDayScaleProps extends WeekView.DayScaleCellProps {
  nextDayDate: Date;
}

const DayScaleCell = ({ nextDayDate, ...restProps }: ExtendedDayScaleProps) => {
  const { startDate } = restProps;
  if (startDate && new Date(startDate.toDateString()) < new Date(nextDayDate.toDateString())) {
    return <WeekView.DayScaleCell {...restProps} className="day--not-available" />;
  }
  if (startDate.getDay() === 0 || (startDate.getDay() === 6 && startDate.getDate() % 2 !== 0)) {
    return <WeekView.DayScaleCell {...restProps} className="day--weekend" />;
  }
  return <WeekView.DayScaleCell {...restProps} />;
};

export default DayScaleCell;
