import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedDateEditorComponent = (props: AppointmentForm.DateEditorProps) => (
  <AppointmentForm.DateEditor {...props} readOnly />
);

export default CustomizedDateEditorComponent;
