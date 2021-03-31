import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

const Appointment = ({ children, ...restProps }: Appointments.AppointmentProps) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      backgroundColor: '#FFC107',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default Appointment;
