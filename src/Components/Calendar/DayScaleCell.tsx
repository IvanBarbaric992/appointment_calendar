import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

import './Calendar.scss';

interface ExtendedDayScaleCellProps extends WeekView.DayScaleCellProps {
  currentDate: Date;
}

const DayScaleCell = ({ currentDate, ...restProps }: ExtendedDayScaleCellProps) => {
  const { startDate } = restProps;
  if (startDate && new Date(startDate.toDateString()) < new Date(currentDate.toDateString())) {
    return <WeekView.DayScaleCell {...restProps} className="day--not-available" />;
  }
  if (startDate.getDay() === 0 || (startDate.getDay() === 6 && startDate.getDate() % 2 !== 0)) {
    return <WeekView.DayScaleCell {...restProps} className="day--weekend" />;
  }
  return <WeekView.DayScaleCell {...restProps} />;
};

export default DayScaleCell;
