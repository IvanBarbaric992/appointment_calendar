import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedDateEditorComponent = (props: AppointmentForm.DateEditorProps) => (
  <AppointmentForm.DateEditor readOnly {...props} />
);

export default CustomizedDateEditorComponent;
