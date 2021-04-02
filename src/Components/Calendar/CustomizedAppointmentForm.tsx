import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedAppointmentForm = (props: AppointmentForm.BasicLayoutProps) => {
  const { appointmentData } = props;
  return <AppointmentForm.BasicLayout {...props} readOnly={!!appointmentData.isReadOnly} />;
};

export default CustomizedAppointmentForm;
