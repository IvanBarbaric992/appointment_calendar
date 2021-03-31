import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

const Appointment = ({ children, ...restProps }: Appointments.AppointmentProps) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      fontSize: '1rem',
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default Appointment;
