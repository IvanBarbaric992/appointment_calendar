import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

import './Calendar.scss';

const DayScaleCell = (props: WeekView.DayScaleCellProps) => {
  const { startDate } = props;
  if (startDate.getDay() === 0 || (startDate.getDay() === 6 && startDate.getDate() % 2 !== 0)) {
    return <WeekView.DayScaleCell {...props} className="day--weekend"  />;
  }
  return <WeekView.DayScaleCell {...props} />;
};

export default DayScaleCell;
