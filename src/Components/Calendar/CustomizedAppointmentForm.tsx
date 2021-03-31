import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedAppointmentForm = ({
  appointmentData,
  onFieldChange,
  ...restProps
}: AppointmentForm.BasicLayoutProps) => (
  <AppointmentForm.BasicLayout appointmentData={appointmentData} onFieldChange={onFieldChange} {...restProps} />
);

export default CustomizedAppointmentForm;
